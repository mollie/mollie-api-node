#!/usr/bin/env node
/**
 * extract-spec.mjs — turn Mollie's master OpenAPI spec into a compact, lossless
 * per-operation field digest, or list every operation.
 *
 * Source of truth is `mollie/openapi` specs.yaml (operationId == endpoint key,
 * complete + deterministic). All $refs are local. Descriptions are preserved
 * VERBATIM — a completeness self-check fails the run (exit 3) if any description
 * in the spec is dropped from the digest, so silent loss is impossible.
 *
 * Usage:
 *   node extract-spec.mjs --index                 list every operation (METHOD path -> operationId)
 *   node extract-spec.mjs <operationId>           human-readable digest report
 *   node extract-spec.mjs <operationId> --json     digest rows as JSON (for diff.mjs)
 *   node extract-spec.mjs <operationId> --show      include the rendered digest
 *   flags: --refresh (force re-fetch), --spec <path> (use a local spec file)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, renameSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const RAW_URL = 'https://raw.githubusercontent.com/mollie/openapi/main/specs.yaml';
const REPO_ROOT = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: dirname(fileURLToPath(import.meta.url)) }).toString().trim();
const CACHE_DIR = `${REPO_ROOT}/.tmp/sync-api`;
const CACHE_SPEC = `${CACHE_DIR}/specs.yaml`;
const CACHE_ETAG = `${CACHE_DIR}/specs.etag`;

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

// ---- fetch + cache ---------------------------------------------------------
// Freshness uses a conditional GET (If-None-Match/ETag) against the raw CDN —
// NOT api.github.com, which is rate-limited (60/hr unauthenticated) and more
// likely blocked in sandboxes. A 304 confirms the cache without re-downloading.
const CHECKED = `${CACHE_DIR}/.checked`;     // mtime = last freshness check
const CHECK_TTL = 15 * 60 * 1000;            // skip the check within this window (keeps batches fast & quiet)
function conditionalGet(useEtag) {
  const etag = useEtag && existsSync(CACHE_ETAG) ? readFileSync(CACHE_ETAG, 'utf8').trim() : null;
  // per-process scratch paths: the skill fans out parallel per-resource agents,
  // so shared scratch files would race (and could promote a half-written body).
  const hdr = `${CACHE_DIR}/.hdr.${process.pid}`, body = `${CACHE_DIR}/.body.${process.pid}`;
  const a = ['-sS', '--max-time', '15', '-L', '-D', hdr, '-o', body, '-w', '%{http_code}', '-H', 'User-Agent: sync-api'];
  if (etag) a.push('-H', `If-None-Match: ${etag}`);
  a.push(RAW_URL);
  let code;
  try { code = execFileSync('curl', a, { maxBuffer: 1 << 28 }).toString().trim(); }
  catch (e) { rmSync(hdr, { force: true }); rmSync(body, { force: true }); throw e; } // clean scratch on curl failure before propagating
  const headers = existsSync(hdr) ? readFileSync(hdr, 'utf8') : '';
  rmSync(hdr, { force: true });                  // header scratch consumed — don't leave it behind
  const newEtag = (headers.match(/^etag:\s*(.+?)\s*$/im) || [])[1]; // capture the full validator verbatim — strong `"…"` AND weak `W/"…"`
  return { code, body, newEtag };
}
function loadSpec() {
  const local = opt('--spec');
  if (local) return YAML.parse(readFileSync(local, 'utf8'));
  mkdirSync(CACHE_DIR, { recursive: true });
  const haveCache = existsSync(CACHE_SPEC);
  const checkedAge = existsSync(CHECKED) ? Date.now() - statSync(CHECKED).mtimeMs : Infinity;
  const refresh = flag('--refresh');
  if (!refresh && haveCache && checkedAge < CHECK_TTL) return YAML.parse(readFileSync(CACHE_SPEC, 'utf8'));

  const mark = () => writeFileSync(CHECKED, '');
  let res;
  try { res = conditionalGet(!refresh); } catch { /* offline / sandbox-blocked */ }

  if (res && res.code === '304' && haveCache) {                       // unchanged
    rmSync(res.body, { force: true });           // body empty on 304; clean up regardless
    if (res.newEtag) writeFileSync(CACHE_ETAG, res.newEtag);
    mark();
    return YAML.parse(readFileSync(CACHE_SPEC, 'utf8'));
  }
  if (res && res.code === '200') {                                    // new / changed
    const text = readFileSync(res.body, 'utf8');
    if (text.includes('openapi:') || text.includes('paths:')) {
      renameSync(res.body, CACHE_SPEC);          // atomic promote — no lingering duplicate
      if (res.newEtag) writeFileSync(CACHE_ETAG, res.newEtag);
      mark();
      process.stderr.write('[extract-spec] fetched latest spec\n');
      return YAML.parse(text);
    }
  }
  if (res?.body) rmSync(res.body, { force: true });                   // unexpected status — don't leave scratch
  if (haveCache) {                                                    // offline/blocked → cache fallback
    const fetched = statSync(CACHE_SPEC).mtime.toISOString().slice(0, 10);
    process.stderr.write(`[extract-spec] could not reach raw.githubusercontent.com (sandbox/offline); using cached spec from ${fetched} — run with --refresh from a network-enabled context\n`);
    mark();
    return YAML.parse(readFileSync(CACHE_SPEC, 'utf8'));
  }
  throw new Error('no cached spec and could not fetch — run once from a network-enabled context (curl raw.githubusercontent.com must be allowed)');
}

const spec = loadSpec();

// ---- $ref resolution (local pointers only) --------------------------------
function resolveRef(ref) {
  if (!ref.startsWith('#/')) throw new Error(`external ref unsupported: ${ref}`);
  return ref.slice(2).split('/').reduce((node, key) => {
    if (node == null) throw new Error(`unresolved ref: ${ref}`);
    return node[key.replace(/~1/g, '/').replace(/~0/g, '~')];
  }, spec);
}
function deref(node, seen) {
  let n = node;
  const chain = new Set(); // refs followed within THIS call — catches a cyclic alias chain (A → B → A)
  while (n && typeof n === 'object' && n.$ref) {
    if (seen.has(n.$ref) || chain.has(n.$ref)) return { __circular: n.$ref }; // ancestor cycle OR self-cycle
    chain.add(n.$ref);
    n = resolveRef(n.$ref);
  }
  return n;
}

// ---- operation index ------------------------------------------------------
const METHODS = ['get', 'post', 'patch', 'put', 'delete'];
function indexOperations() {
  const ops = [];
  for (const [path, item] of Object.entries(spec.paths ?? {})) {
    for (const m of METHODS) if (item[m]?.operationId) ops.push({ operationId: item[m].operationId, method: m, path, op: item[m] });
  }
  return ops;
}

// An operation exposes up to three comparable sides:
//   response — 200/201 body         → SDK Data interface
//   request  — requestBody (may be a $ref to a requestBodies component) → SDK *Parameters
//   params   — query parameters     → SDK *Parameters
// Returns null when a side is absent (e.g. 204 No Content, GET with no body) —
// callers treat that as "nothing to compare", not an error.
function getSchema(op, side) {
  if (side === 'request') {
    let rb = op.requestBody;
    if (rb?.$ref) rb = resolveRef(rb.$ref);
    const c = rb?.content ?? {};
    return (c['application/json'] ?? Object.values(c)[0])?.schema ?? null;
  }
  if (side === 'params') {
    // a $ref'd parameter may carry sibling overrides (description, schema with enum/x-enumDescriptions);
    // merge siblings OVER the resolved component so the operation-level override wins.
    const params = (op.parameters ?? []).map(p => (p.$ref ? { ...resolveRef(p.$ref), ...p } : p)).filter(p => p?.in === 'query');
    if (!params.length) return null;
    const properties = {}, required = [];
    for (const p of params) { properties[p.name] = { ...(p.schema ?? {}), description: p.description ?? p.schema?.description }; if (p.required) required.push(p.name); }
    return { type: 'object', properties, required };
  }
  const r = op.responses ?? {};
  const key = ['200', '201', 200, 201].find(k => r[k]);
  const c = r[key]?.content ?? {};
  return (c['application/hal+json'] ?? c['application/json'] ?? Object.values(c)[0])?.schema ?? null;
}

// ---- description resolution + allOf merge (collision-safe) ----------------
// Descriptions live in 3 places: as a sibling of `allOf`, inside an `allOf`
// member, or on a $ref target. Collisions across composition branches are
// preserved (joined) so no variant description is ever silently dropped.
function descriptionsOf(node, seen) {
  const out = [];
  if (!node || typeof node !== 'object') return out;
  if (node.description) out.push(node.description);
  if (Array.isArray(node.allOf)) {
    for (const m of node.allOf) { if (m?.description) out.push(m.description); }
    if (!out.length) for (const m of node.allOf) { const r = deref(m, seen); if (r?.description) { out.push(r.description); break; } }
  }
  if (Array.isArray(node.__descs)) out.push(...node.__descs);
  return [...new Set(out)];
}
// Does this PROPERTY node carry its own (field-level) description, vs. only
// inheriting a reusable component's description via $ref? Used to mark generic
// boilerplate (e.g. the shared `amount`/`url` description) the SDK intentionally
// does not repeat per-field, so the JSDoc-coverage check can skip it.
function hasOwnDescription(node) {
  if (!node || typeof node !== 'object') return false;
  if (node.description) return true;
  if (Array.isArray(node.__descs) && node.__descs.length) return true;
  if (Array.isArray(node.allOf) && node.allOf.some(m => m?.description)) return true;
  return false;
}
function effectiveDescription(node, seen) {
  const ds = descriptionsOf(node, seen);
  return ds.length ? ds.join('\n\n— or —\n\n') : undefined;
}
function mergeAllOf(node, seen) {
  const out = { type: undefined, properties: {}, required: [] };
  const mergeProps = (props, ownerDesc) => {
    for (const [k, v] of Object.entries(props ?? {})) {
      if (out.properties[k]) {
        // collision: preserve any distinct description from the incoming branch
        const prev = out.properties[k];
        const add = [...descriptionsOf(prev, seen), ...descriptionsOf(v, seen)];
        v.__descs = [...new Set([...(prev.__descs ?? []), ...add])];
      }
      out.properties[k] = v;
    }
  };
  for (const m of node.allOf) {
    const innerSeen = m.$ref ? new Set(seen).add(m.$ref) : seen;
    const r = deref(m, seen) ?? {};
    if (r.__circular) { out.__circular = r.__circular; continue; }
    if (Array.isArray(r.allOf)) {           // nested allOf (e.g. settlement-capture → capture → entity-capture)
      const inner = mergeAllOf(r, innerSeen);
      if (inner.type && !out.type) out.type = inner.type;
      mergeProps(inner.properties);
      out.required.push(...inner.required);
      if (inner.__circular) out.__circular = inner.__circular;
      continue;
    }
    if (r.type && !out.type) out.type = r.type;
    mergeProps(r.properties);
    if (Array.isArray(r.required)) out.required.push(...r.required);
  }
  mergeProps(node.properties);
  if (Array.isArray(node.required)) out.required.push(...node.required);
  if (!out.type && Object.keys(out.properties).length) out.type = 'object';
  return out;
}

function typeOf(node, seen) {
  if (!node) return 'unknown';
  if (node.$ref) return node.$ref.split('/').pop();
  if (Array.isArray(node.allOf)) {
    const ref = node.allOf.find(m => m.$ref);
    if (ref) return ref.$ref.split('/').pop();
    return mergeAllOf(node, seen).type ?? 'object';
  }
  if (Array.isArray(node.type)) return node.type.filter(t => t !== 'null').join('|') || 'null';
  return node.type ?? (node.properties ? 'object' : node.enum ? 'enum' : 'unknown');
}
const isNullable = (node) => !!node && (node.nullable === true || (Array.isArray(node.type) && node.type.includes('null')));

// ---- flatten --------------------------------------------------------------
const rows = [];
// `raw` is the pre-deref node (a property may be `{$ref, description}` or carry
// collision __descs); `node` is the resolved schema. Merge descriptions from
// both — OpenAPI 3.1 $ref siblings (e.g. emailDetails) would otherwise be lost.
function emit(path, raw, node, requiredSet, seen, typeOverride) {
  const name = path.split('.').pop().replace(/\[\]$/, '');
  const row = { path, type: typeOverride ?? typeOf(node, seen) };
  if (requiredSet?.has(name)) row.required = true;
  if (isNullable(raw) || isNullable(node)) row.nullable = true;
  if (raw.readOnly || node.readOnly) row.readOnly = true;
  if (raw.writeOnly || node.writeOnly) row.writeOnly = true;
  const enumVals = node.enum ?? raw.enum ?? node.allOf?.map(m => deref(m, seen)?.enum).find(Boolean);
  if (enumVals) row.enum = enumVals;
  const xde = node['x-deprecated-enum'] ?? raw['x-deprecated-enum'];
  if (xde) row.xDeprecatedEnum = xde;
  const xed = node['x-enumDescriptions'] ?? raw['x-enumDescriptions'];
  if (xed) row.xEnumDescriptions = xed;
  if (node.deprecated || raw.deprecated) row.deprecated = true;
  const descs = [...new Set([...descriptionsOf(raw, seen), ...descriptionsOf(node, seen)])];
  if (descs.length) row.description = descs.join('\n\n— or —\n\n');
  // generic = description comes only from a shared $ref'd component, not the field itself
  if (descs.length && !hasOwnDescription(raw)) row.genericDesc = true;
  rows.push(row);
}
function walk(rawNode, path, requiredSet, seen) {
  const node = deref(rawNode, seen);
  if (!node || typeof node !== 'object') return;
  if (node.__circular) { rows.push({ path, type: `[circular:${node.__circular.split('/').pop()}]` }); return; }
  const next = rawNode.$ref ? new Set(seen).add(rawNode.$ref) : seen;

  const union = node.oneOf ?? node.anyOf;
  if (union) {
    emit(path || '(root)', rawNode, node, requiredSet, next, (node.oneOf ? 'oneOf' : 'anyOf') + `(${union.length})`);
    union.forEach((b, i) => walk(b, `${path}|v${i}`, new Set(), next));
    return;
  }
  if (Array.isArray(node.allOf)) {
    const merged = mergeAllOf(node, next);
    if (merged.type === 'object' && Object.keys(merged.properties).length) {
      if (path) emit(path, rawNode, node, requiredSet, next, 'object');
      const req = new Set(merged.required);
      for (const [k, v] of Object.entries(merged.properties)) walk(v, path ? `${path}.${k}` : k, req, next);
      return;
    }
    emit(path, rawNode, node, requiredSet, next);
    return;
  }
  const t = Array.isArray(node.type) ? node.type.filter(x => x !== 'null')[0] : node.type;
  const addl = node.additionalProperties && typeof node.additionalProperties === 'object' ? node.additionalProperties : null;
  if (t === 'object' || node.properties || addl) {
    if (path) emit(path, rawNode, node, requiredSet, next, 'object');
    const req = new Set(node.required ?? []);
    for (const [k, v] of Object.entries(node.properties ?? {})) walk(v, path ? `${path}.${k}` : k, req, next);
    if (addl) walk(addl, `${path}{*}`, new Set(), next); // map type (e.g. settlement periods: year -> month -> period)
    return;
  }
  if (t === 'array' && node.items) { if (path) emit(path, rawNode, node, requiredSet, next, 'array'); walk(node.items, `${path}[]`, new Set(), next); return; }
  emit(path, rawNode, node, requiredSet, next);
}

// ---- completeness self-check (HARD GATE) ----------------------------------
// isRefRoot = we just followed a $ref into a reusable component. Its OWN root
// description is an overridable fallback (e.g. the generic `amount` description),
// emitted by the walker only when a referencing field has no description of its
// own — so it must NOT be required. Field-level descriptions (inside properties,
// allOf members, items) are still required, preserving drop detection.
function collectDescriptions(node, acc, refs, isRefRoot = false) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { node.forEach(n => collectDescriptions(n, acc, refs, false)); return; }
  if (node.$ref) { if (!refs.has(node.$ref)) collectDescriptions(resolveRef(node.$ref), acc, new Set(refs).add(node.$ref), true); return; }
  for (const [k, v] of Object.entries(node)) {
    if (k === 'example' || k === 'examples') continue;
    if (k === 'description' && typeof v === 'string') { if (!isRefRoot) acc.add(v); }
    else collectDescriptions(v, acc, refs, false);
  }
}

// ---- run ------------------------------------------------------------------
const target = args.find(a => !a.startsWith('--') && a !== opt('--spec'));

if (flag('--index') || target === undefined) {
  const ops = indexOperations();
  // index JSON is small (~8KB, no truncation risk) so a synchronous exit is safe here;
  // the large per-operation digest at script-end uses the drain-callback exit instead.
  if (flag('--json')) { process.stdout.write(JSON.stringify(ops.map(({ op, ...o }) => o))); process.exit(0); }
  console.log(`operations: ${ops.length}`);
  console.log(ops.map(o => `${o.method.toUpperCase().padEnd(6)} ${o.path}  -> ${o.operationId}`).join('\n'));
  process.exit(0);
}

const ops = indexOperations();
const op = ops.find(o => o.operationId === target);
if (!op) { console.error(`operationId not found: ${target} (use --index to list)`); process.exit(1); }

// --meta: the operation's own summary/description/deprecated — the anchor for
// comparing a binder method's JSDoc against the endpoint description (Phase 2).
if (flag('--meta')) {
  const m = { operationId: target, method: op.method.toUpperCase(), path: op.path, summary: op.op.summary ?? null, description: op.op.description ?? null, deprecated: !!op.op.deprecated };
  if (flag('--json')) { process.stdout.write(JSON.stringify(m)); process.exit(0); }
  console.log(`=== ${target} (${m.method} ${op.path}) [meta] ===`);
  if (m.deprecated) console.log('⚠️ DEPRECATED (operation-level deprecated: true)');
  if (m.summary) console.log(`summary: ${m.summary}`);
  console.log(`description:\n${m.description ?? '(none)'}`);
  process.exit(0);
}
// --side: explicit, else auto (mutations → request body, others → response).
const side = opt('--side') ?? (['post', 'patch', 'put'].includes(op.method) ? 'request' : 'response');
const schema = getSchema(op.op, side);

// A missing side is a clean no-op (204 No Content, GET with no body / no query params) — exit 0.
if (!schema) {
  if (flag('--json')) { process.stdout.write('[]'); process.exit(0); }
  console.log(`=== ${target} (${op.method.toUpperCase()} ${op.path}) [${side}] ===`);
  console.log(`no ${side} schema (nothing to compare on this side)`);
  process.exit(0);
}

walk(schema, '', new Set(), new Set());

// self-check
const allDesc = new Set();
collectDescriptions(schema, allDesc, new Set());
const emittedBlob = rows.map(r => r.description).filter(Boolean).join('\n');
const missing = [...allDesc].filter(d => !emittedBlob.includes(d.trim())); // full string — a partial/truncated emit must not pass the lossless check

if (flag('--json')) {
  if (missing.length) { process.stderr.write(`[extract-spec] FAIL: ${missing.length} descriptions dropped for ${target}\n`); process.exit(3); }
  // write-then-exit-on-drain: process.exit() right after write() truncates large piped output
  process.stdout.write(JSON.stringify(rows), () => process.exit(0));
} else {
  console.log(`=== ${target} (${op.method.toUpperCase()} ${op.path}) [${side}] ===`);
  console.log(`fields: ${rows.length} | descriptions: ${allDesc.size} emitted, ${missing.length} missing`);
  if (missing.length) { console.log('--- ⚠️ DROPPED DESCRIPTIONS (self-check FAIL) ---'); missing.forEach(d => console.log(`  ✗ ${d.slice(0, 100).replace(/\n/g, ' ')}`)); }
  if (flag('--show')) console.log('--- DIGEST ---\n' + rows.map(r => JSON.stringify(r)).join('\n'));
  process.exit(missing.length ? 3 : 0);
}
