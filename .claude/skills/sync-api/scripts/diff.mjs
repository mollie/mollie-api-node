#!/usr/bin/env node
/**
 * diff.mjs — deterministic structural delta between the master-spec digest and
 * the SDK's declared shape for one operation. Emits mechanical facts; the agent
 * applies judgment (Pick-vs-inline, breaking-change, nullable, JSDoc).
 *
 * The comparison side is chosen from the SDK TYPE, not the HTTP method:
 *   - a Data interface   → compared against the RESPONSE body (writeOnly filtered)
 *   - a *Parameters type  → compared against the REQUEST body (readOnly filtered)
 *                           UNION the query parameters
 * so `diff get-capture …/data.ts CaptureData` checks the response and
 * `diff get-capture …/parameters.ts GetParameters` checks the query params —
 * no more diffing query params against the response schema.
 *
 * Base mixins (TestModeParameter, IdempotencyParameter, Pagination, Sort,
 * Throttling) and Model/Links heritage are expanded; transport-only params
 * (idempotencyKey, valuesPerMinute) are ignored. Unknown bases are annotated.
 *
 * Usage: node diff.mjs <operationId> <sdkFile.ts> <SdkTypeName>
 */
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: HERE }).toString().trim();
// Suppressed from "IN SDK, not in spec" — but only where the diff structurally CAN'T compare:
//  - idempotencyKey: the `Idempotency-Key` HEADER (diff compares query+body, not headers); universal on writes.
//  - valuesPerMinute: ThrottlingParameter — a client-side pagination throttle, never an API field in any spec.
// NOT testmode: the spec reliably lists it where supported and omits it on live-only endpoints (settlements),
// so an SDK type that declares testmode where the spec omits it is a genuine over-declaration → must surface.
const IGNORE_EXTRA = new Set(['idempotencyKey', 'valuesPerMinute']);

function run(script, args) {
  try {
    return JSON.parse(execFileSync('node', [`${HERE}/${script}`, ...args], { maxBuffer: 1 << 28 }).toString());
  } catch (e) {
    const last = ((e.stderr ?? Buffer.from('')).toString().trim().split('\n').pop()) || (e.message || '').split('\n')[0];
    const err = new Error(`${script} ${args.filter(a => a !== '--json').join(' ')} — ${last}`);
    err.clean = true;
    throw err;
  }
}

const sdkCache = new Map();
const loadSdk = (file) => { if (!sdkCache.has(file)) sdkCache.set(file, run('extract-sdk.mjs', [file, '--json'])); return sdkCache.get(file); };
function resolveModule(fromFile, spec) {            // relative import → actual .ts file
  if (!spec.startsWith('.')) return null;
  const base = resolve(dirname(fromFile), spec);
  for (const c of [`${base}.ts`, `${base}/index.ts`]) if (existsSync(c)) return c;
  return null;
}
// member names of a *Links interface/alias, following `extends`/`= Base` across files
function linkMembers(file, typeName, seen = new Set()) {
  const names = new Set();
  const key = `${file}#${typeName}`;
  if (seen.has(key)) return names; seen.add(key);
  const sdk = loadSdk(file);
  const resolveBaseName = (base) => {
    const b = base.replace(/<.*/, '').trim();
    const imp = sdk.imports.find(i => i.local === b);
    const target = imp ? [resolveModule(file, imp.module), imp.imported] : [file, b];
    if (target[0]) for (const n of linkMembers(target[0], target[1], seen)) names.add(n);
  };
  const it = sdk.interfaces.find(i => i.name === typeName);
  const ta = sdk.types.find(t => t.name === typeName);
  if (it) { for (const f of it.fields) names.add(f.name); for (const e of it.extends ?? []) resolveBaseName(e); }
  else if (ta) { for (const f of ta.inline) names.add(f.name); for (const b of ta.bases) resolveBaseName(b); }
  return names;
}

function topLevel(rows, { dropReadOnly = false, dropWriteOnly = false } = {}) {
  // First pass: which top-level fields to drop, from their container row's flags.
  // Must drop the WHOLE subtree — otherwise sub-rows (owner.x) re-introduce the
  // top-level key (owner) that the container row's readOnly/writeOnly should remove.
  const drop = new Set();
  for (const r of rows) {
    const top = r.path.split('.')[0].replace(/\[\]$/, '');
    if (r.path === top && ((dropReadOnly && r.readOnly) || (dropWriteOnly && r.writeOnly))) drop.add(top);
  }
  const map = new Map();
  for (const r of rows) {
    const top = r.path.split('.')[0].replace(/\[\]$/, '');
    if (!top || top.includes('|') || top === '(root)' || drop.has(top)) continue;
    if (!map.has(top)) map.set(top, r);
  }
  return map;
}

// Advisory content-loss detector: which spec-description sentences are NOT
// reflected in the SDK JSDoc. Targets TRUNCATION (omitted sentences), not
// rewording — a reworded sentence reuses its salient words (high overlap, not
// flagged); a dropped one has its words absent (flagged). NOT verbatim equality:
// SDK-specific notes and doc corrections are fine (additions never flag; the
// agent judges intentional omissions). Returns dropped sentence snippets.
const STOP = new Set('the a an to of for and or in on is are be this that with as it you your we will can if by at from not but have has been their les use used'.split(' '));
const norm = (s) => s.toLowerCase().replace(/`/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
function coverageGaps(spec, doc) {
  if (!spec || !doc) return [];
  const docWords = new Set(norm(doc).split(' '));
  const gaps = [];
  for (const sent of spec.split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(Boolean)) {
    const words = norm(sent).split(' ').filter(w => w.length > 2 && !STOP.has(w));
    if (words.length < 4) continue;                                  // skip trivial sentences
    const hit = words.filter(w => docWords.has(w)).length / words.length;
    if (hit < 0.5) gaps.push(sent.replace(/\s+/g, ' ').slice(0, 90));
  }
  return gaps;
}

try {
  const [operationId, sdkFile, sdkTypeName] = process.argv.slice(2);
  if (!operationId || !sdkFile || !sdkTypeName) { console.error('usage: diff.mjs <operationId> <sdkFile.ts> <SdkTypeName>'); process.exit(1); }

  const meta = run('extract-spec.mjs', ['--index', '--json']).find(o => o.operationId === operationId);
  if (!meta) { console.error(`operationId not found: ${operationId} (run: node extract-spec.mjs --index)`); process.exit(1); }

  const sdk = loadSdk(sdkFile);
  const iface = sdk.interfaces.find(i => i.name === sdkTypeName);
  const talias = sdk.types.find(t => t.name === sdkTypeName);
  if (!iface && !talias) { console.error(`type "${sdkTypeName}" not found in ${sdkFile}`); process.exit(1); }

  const mixins = {};
  for (const i of loadSdk(`${REPO_ROOT}/src/types/parameters.ts`).interfaces) mixins[i.name] = i.fields.map(f => f.name);

  // --- spec side from the type's ROLE (name/file), NOT its declaration kind:
  // a *Parameters type is the request side even when declared `interface … extends`
  // (e.g. `interface CreateParameters extends IdempotencyParameter`); a Data
  // interface is the response side. (`iface`/`talias` only gate existence above.)
  const isParamsType = /Parameters$/.test(sdkTypeName) || /(^|\/)parameters\.ts$/.test(sdkFile) || /\/binders\//.test(sdkFile);
  let specTop, side, specResponseRows = null;
  if (!isParamsType) {
    side = 'response';
    specResponseRows = run('extract-spec.mjs', [operationId, '--side', 'response', '--json']);
    specTop = topLevel(specResponseRows, { dropWriteOnly: true });
  } else {
    side = 'request+params';
    const body = topLevel(run('extract-spec.mjs', [operationId, '--side', 'request', '--json']), { dropReadOnly: true });
    const params = topLevel(run('extract-spec.mjs', [operationId, '--side', 'params', '--json']));
    specTop = new Map([...body, ...params]);
  }

  // --- SDK side: resolve effective fields, following Pick/Omit and named bases
  // recursively ACROSS files (via imports). Standard mixins are known directly.
  const unresolved = [];
  const sdkFields = new Map();
  const set = (out, name, info) => { if (!out.has(name)) out.set(name, info); };
  const resolveBase = (file, expr, remove, seen, out, sdk) => {
    expr = expr.trim();
    const m = expr.match(/^(Omit|Pick)<\s*([\w$.]+)\s*,\s*(.+)>$/);
    if (m) {
      const keys = [...m[3].matchAll(/'([^']+)'/g)].map(x => x[1]);
      if (m[1] === 'Omit') return resolveName(file, m[2], new Set([...remove, ...keys]), seen, out, sdk);
      const tmp = new Map(); resolveName(file, m[2], new Set(), seen, tmp, sdk);
      for (const [k, v] of tmp) if (keys.includes(k) && !remove.has(k)) set(out, k, v);
      return;
    }
    resolveName(file, expr.replace(/<.*/, ''), remove, seen, out, sdk);
  };
  function resolveName(file, name, remove, seen, out, sdk) {
    if (mixins[name]) { for (const f of mixins[name]) if (!remove.has(f)) set(out, f, { via: name }); return; }
    if (name === 'Model') { for (const f of ['id', 'resource']) if (!remove.has(f)) set(out, f, { via: 'Model' }); return; }
    if (name === 'Links') { if (!remove.has('_links')) set(out, '_links', { via: 'Links' }); return; }
    if (sdk.types.some(t => t.name === name) || sdk.interfaces.some(i => i.name === name)) return resolveType(file, name, remove, seen, out);
    const imp = sdk.imports.find(i => i.local === name);
    if (imp) { const f = resolveModule(file, imp.module); if (f) return resolveType(f, imp.imported, remove, seen, out); }
    unresolved.push(name);
  }
  function resolveType(file, typeName, remove, seen, out) {
    const key = `${file}#${typeName}`;
    if (seen.has(key)) return; seen.add(key);
    const sdk = loadSdk(file);
    const it = sdk.interfaces.find(i => i.name === typeName);
    const ta = sdk.types.find(t => t.name === typeName);
    if (it) {
      for (const f of it.fields) if (!remove.has(f.name)) set(out, f.name, { via: 'interface', ...f });
      for (const e of it.extends ?? []) resolveBase(file, e, remove, seen, out, sdk);
    } else if (ta) {
      for (const p of ta.picks) for (const n of p.fields) if (!remove.has(n)) set(out, n, { via: `Pick<${p.from}>` });
      for (const p of ta.pickOptionals) for (const n of p.fields) if (!remove.has(n)) set(out, n, { via: `PickOptional<${p.from}>` });
      for (const f of ta.inline) if (!remove.has(f.name)) set(out, f.name, { via: 'inline', ...f });
      for (const b of ta.bases) resolveBase(file, b, remove, seen, out, sdk);
    } else unresolved.push(typeName);
  }
  resolveType(sdkFile, sdkTypeName, new Set(), new Set(), sdkFields);

  // --- diff
  const WIRING = new Set(['_links', '_embedded']); // handled in the dedicated WIRING section below (sub-entries + helper coverage), not as flat top-level fields
  const pathParams = new Set([...meta.path.matchAll(/\{(\w+)\}/g)].map(m => m[1])); // {settlementId} etc. — method args, not param fields
  const missing = [...specTop.keys()].filter(k => !WIRING.has(k) && !sdkFields.has(k));
  const extra = [...sdkFields.keys()].filter(k => !specTop.has(k) && !WIRING.has(k) && !IGNORE_EXTRA.has(k) && !pathParams.has(k));
  const both = [...specTop.keys()].filter(k => sdkFields.has(k));

  const o = console.log;
  o(`\n=== DIFF ${operationId} (${meta.method.toUpperCase()} ${meta.path}) [${side}]  vs  ${sdkTypeName} ===`);
  o(`spec: ${specTop.size} | SDK: ${sdkFields.size} | overlap: ${both.length}`);
  if (unresolved.length) o(`(could not resolve base/type — fields below may be provided by: ${[...new Set(unresolved)].join(', ')})`);

  o(`\nMISSING in SDK [${missing.length}]  (in spec, not declared):`);
  for (const k of missing) { const r = specTop.get(k); o(`  + ${k}: ${r.type}${r.required ? ' (required)' : ''}${r.deprecated ? ' [DEPRECATED]' : ''}${r.writeOnly ? ' [writeOnly]' : ''}`); }

  // For an extra field, the operation description often EXPLAINS the absence
  // (e.g. testmode → "This endpoint currently does not support test mode yet").
  // Surface that authoritative caveat so the agent judges over-declaration vs
  // mere spec-incompleteness — param-absence alone can't tell them apart.
  let opDescription = '';
  if (extra.length) { try { opDescription = run('extract-spec.mjs', [operationId, '--meta', '--json']).description || ''; } catch { /* meta optional */ } }
  const caveatFor = (field) => {
    if (!opDescription) return '';
    const clean = opDescription.replace(/^[>\s]*/gm, '').replace(/\*\*/g, '').replace(/[ℹ️\u{1F4D8}\u{1F6AB}⚠]/gu, '').replace(/\s+/g, ' ').trim();
    // alphanumeric-only key so "test mode" (prose) matches "testmode" (field), incl. compound lowercase names
    const key = field.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (key.length < 4) return ''; // too short → substring matches would be noise
    const CAVEAT = /not support|no longer|not available|will be ignored|only (available|relevant)|cannot|does not/i;
    for (const s of clean.split(/(?<=[.!?])\s+/)) {
      if (s.length > 15 && CAVEAT.test(s) && s.toLowerCase().replace(/[^a-z0-9]/g, '').includes(key)) return s.trim().slice(0, 160);
    }
    return '';
  };

  o(`\nIN SDK, not in spec [${extra.length}]  (needs-attention: removed? never existed?):`);
  for (const k of extra) { const c = caveatFor(k); o(`  ? ${k}  (via ${sdkFields.get(k).via})${c ? ` — spec note: "${c}"` : ''}`); }

  o(`\nDOC / @see drift [in both]:`);
  for (const k of both) {
    const s = sdkFields.get(k), sp = specTop.get(k), notes = [];
    if ((s.via === 'interface' || s.via === 'inline') && !s.jsdoc) notes.push('no-JSDoc');
    if (s.jsdoc?.see?.some(u => /\/reference\/v2\//.test(u))) notes.push('old-@see-format');
    if (sp.deprecated && !s.jsdoc?.deprecated) notes.push('spec-DEPRECATED but SDK not @deprecated');
    // content loss (advisory — judge intentional drift vs accidental truncation; see SKILL.md Phase 2).
    // skip genericDesc fields: shared-component boilerplate (amount/url) the SDK intentionally doesn't repeat.
    const gaps = s.jsdoc?.comment && !sp.genericDesc ? coverageGaps(sp.description, s.jsdoc.comment) : [];
    if (gaps.length) notes.push(`JSDoc may drop ${gaps.length} spec sentence(s): "${gaps[0]}${gaps.length > 1 ? ' …' : ''}"`);
    if (notes.length) o(`  ! ${k}: ${notes.join('; ')}`);
  }

  // --- WIRING (_links / _embedded) — response side only.
  // Phase 1 = does the link/embed PROPERTY exist (vs spec)?  Phase 3 = is there a
  // HELPER for every link (an invariant over the current state — indifferent to
  // whether the entry is newly added or pre-existing). Base self/documentation
  // are universal HAL links, never helper-exposed → excluded from coverage.
  if (side === 'response' && specResponseRows) {
    const cap = (s) => s[0].toUpperCase() + s.slice(1);
    const BASE_LINKS = new Set(['self', 'documentation']);
    const specLinks = new Set(), specEmbeds = new Set();
    for (const r of specResponseRows) {
      let m = r.path.match(/^_links\.([^.]+)$/); if (m) specLinks.add(m[1]);
      m = r.path.match(/^_embedded\.([^.[]+)/); if (m) specEmbeds.add(m[1]);
    }
    const linksType = (sdkFields.get('_links')?.type || '').replace(/<.*/, '').trim();
    const sdkLinks = linksType ? linkMembers(sdkFile, linksType) : new Set();
    const dir = dirname(sdkFile);
    const helperFiles = (existsSync(dir) ? readdirSync(dir) : []).filter(f => /Helper\.ts$/.test(f));
    const helperMethods = new Set();
    for (const hf of helperFiles) for (const mth of loadSdk(`${dir}/${hf}`).methods ?? []) helperMethods.add(mth.name);
    const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // link names are identifiers in practice, but escape defensively
    const hasHelper = (n) => [...helperMethods].some(mm => new RegExp(`^(get|has)${escRe(n)}(url)?$`, 'i').test(mm));

    const missingProps = [...specLinks].filter(n => !BASE_LINKS.has(n) && !sdkLinks.has(n));
    const uncovered = [...new Set([...specLinks, ...sdkLinks])].filter(n => !BASE_LINKS.has(n) && !hasHelper(n));
    const helperLoc = helperFiles.length ? helperFiles.join(', ') : `NONE in ${dir.replace(REPO_ROOT + '/', '')}/ — must be created`;

    if (missingProps.length || uncovered.length || specEmbeds.size) {
      o(`\nWIRING — _links / _embedded:`);
      for (const n of missingProps) o(`  [P1] _links.${n}: in spec, not on ${linksType || 'the Links interface'} → add the property (+ JSDoc)`);
      for (const n of uncovered) o(`  [P3] _links.${n}: no helper (expected get/has${cap(n)}[Url]) — Helper class: ${helperLoc}`);
      for (const n of specEmbeds) o(`  [embed] _embedded.${n}: verify the 4-file embed wiring + helper (paired with _links.${n}); see references/wiring.md`);
    }
  }
} catch (e) {
  if (e.clean) { console.error(`[diff] failed: ${e.message}`); process.exit(2); }
  throw e;
}
