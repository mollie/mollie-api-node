#!/usr/bin/env node
/**
 * extract-sdk.mjs — structural field map of an SDK .ts file, via the TypeScript
 * AST PARSER (no type-checking). Deliberately does NOT flatten: it preserves the
 * Pick / PickOptional / inline / heritage distinction the skill's Phase-1
 * reasoning depends on, and surfaces duplicate fields (defined via Pick AND
 * inline) and missing JSDoc.
 *
 * Usage:
 *   node extract-sdk.mjs <file.ts>            human-readable
 *   node extract-sdk.mjs <file.ts> --json      structured JSON (for diff.mjs)
 */
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: dirname(fileURLToPath(import.meta.url)) }).toString().trim();
const require = createRequire(import.meta.url);
const ts = require(`${REPO_ROOT}/node_modules/typescript/lib/typescript.js`);

const file = process.argv[2];
if (!file || file.startsWith('--')) { console.error('usage: extract-sdk.mjs <file.ts> [--json]'); process.exit(1); }
if (!existsSync(file)) { console.error(`extract-sdk: file not found: ${file}`); process.exit(1); }
const text = readFileSync(file, 'utf8');
const src = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
const lineOf = (n) => src.getLineAndCharacterOfPosition(n.getStart(src)).line + 1;

function jsdocOf(node) {
  const docs = node.jsDoc;
  if (!docs?.length) return undefined;
  const d = docs[docs.length - 1];
  const raw = d.getFullText(src);                       // raw comment text (URLs intact)
  const comment = typeof d.comment === 'string' ? d.comment
    : Array.isArray(d.comment) ? d.comment.map(c => c.text ?? '').join('') : '';
  const see = [...raw.matchAll(/@see\s+(\S+)/g)].map(m => m[1]);
  const deprecated = /@deprecated/.test(raw);
  return { comment: comment.trim(), see, deprecated, hasDoc: true };
}
function members(typeNode) {
  return (typeNode.members ?? []).filter(ts.isPropertySignature).map(m => {
    const typeText = m.type ? m.type.getText(src) : 'any';
    return { name: m.name.getText(src), optional: !!m.questionToken, type: typeText,
      nullable: /\bNullable<|\|\s*null\b/.test(typeText), line: lineOf(m), jsdoc: jsdocOf(m) };
  });
}
function pickFields(arg) {
  const out = [];
  const collect = (n) => { if (ts.isLiteralTypeNode(n) && ts.isStringLiteral(n.literal)) out.push(n.literal.text); else if (ts.isUnionTypeNode(n)) n.types.forEach(collect); };
  if (arg) collect(arg);
  return out;
}

const result = { file, imports: [], interfaces: [], types: [], methods: [] };
for (const stmt of src.statements) {
  if (ts.isImportDeclaration(stmt) && stmt.importClause?.namedBindings && ts.isNamedImports(stmt.importClause.namedBindings)) {
    const module = stmt.moduleSpecifier.text;
    for (const el of stmt.importClause.namedBindings.elements) {
      result.imports.push({ local: el.name.text, imported: (el.propertyName ?? el.name).text, module });
    }
  } else if (ts.isClassDeclaration(stmt)) {
    // binder methods carry the JSDoc to compare against the operation description (Phase 2).
    // JSDoc sits on the first overload signature; dedupe by name, keep the one with a doc.
    for (const m of stmt.members) {
      if (!ts.isMethodDeclaration(m) || !m.name) continue;
      const name = m.name.getText(src);
      const jsdoc = jsdocOf(m);
      const existing = result.methods.find(x => x.name === name);
      if (existing) { if (jsdoc && !existing.jsdoc) existing.jsdoc = jsdoc; }
      else result.methods.push({ name, line: lineOf(m), jsdoc });
    }
  } else if (ts.isInterfaceDeclaration(stmt)) {
    const ext = (stmt.heritageClauses ?? []).flatMap(h => h.types.map(t => t.getText(src)));
    result.interfaces.push({ name: stmt.name.text, line: lineOf(stmt), extends: ext, fields: members(stmt) });
  } else if (ts.isTypeAliasDeclaration(stmt)) {
    const entry = { name: stmt.name.text, line: lineOf(stmt), picks: [], pickOptionals: [], bases: [], inline: [] };
    const parts = ts.isIntersectionTypeNode(stmt.type) ? stmt.type.types : [stmt.type];
    for (const p of parts) {
      if (ts.isTypeReferenceNode(p)) {
        const tn = p.typeName.getText(src);
        if (tn === 'Pick') entry.picks.push({ from: p.typeArguments?.[0]?.getText(src), fields: pickFields(p.typeArguments?.[1]) });
        else if (tn === 'PickOptional') entry.pickOptionals.push({ from: p.typeArguments?.[0]?.getText(src), fields: pickFields(p.typeArguments?.[1]) });
        else if (tn === 'Omit') entry.bases.push(`Omit<${p.typeArguments?.map(a => a.getText(src)).join(', ')}>`);
        else entry.bases.push(tn);
      } else if (ts.isTypeLiteralNode(p)) entry.inline.push(...members(p));
    }
    // duplicate detection: field in a Pick AND inline
    const pickNames = new Set([...entry.picks, ...entry.pickOptionals].flatMap(p => p.fields));
    entry.duplicates = entry.inline.map(f => f.name).filter(n => pickNames.has(n));
    result.types.push(entry);
  }
}

// NOTE: write then exit only after the stream drains — process.exit() right
// after stdout.write() truncates large piped output (>~64KB pipe buffer).
if (process.argv.includes('--json')) {
  process.stdout.write(JSON.stringify(result), () => process.exit(0));
} else {
  console.log(`=== ${file} ===`);
  for (const i of result.interfaces) {
    console.log(`interface ${i.name}${i.extends.length ? ` extends ${i.extends.join(', ')}` : ''} (L${i.line}) — ${i.fields.length} fields`);
    for (const f of i.fields) console.log(`  ${f.name}${f.optional ? '?' : ''}: ${f.type}${f.nullable ? ' [nullable]' : ''} ${f.jsdoc ? (f.jsdoc.deprecated ? '«jsdoc @deprecated»' : '«jsdoc»') : '✗NO-JSDOC'}${f.jsdoc?.see?.length ? ' see:' + f.jsdoc.see.join(',') : ''}`);
  }
  for (const t of result.types) {
    console.log(`type ${t.name} (L${t.line})${t.duplicates.length ? `  ⚠️ DUPLICATES: ${t.duplicates.join(', ')}` : ''}`);
    for (const p of t.picks) console.log(`  Pick<${p.from}>: ${p.fields.join(', ')}`);
    for (const p of t.pickOptionals) console.log(`  PickOptional<${p.from}>: ${p.fields.join(', ')}`);
    if (t.bases.length) console.log(`  bases: ${t.bases.join(' & ')}`);
    for (const f of t.inline) console.log(`  inline ${f.name}${f.optional ? '?' : ''}: ${f.type}${f.nullable ? ' [nullable]' : ''} ${f.jsdoc ? '«jsdoc»' : '✗NO-JSDOC'}`);
  }
}
