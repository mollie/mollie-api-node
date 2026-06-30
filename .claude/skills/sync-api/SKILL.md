---
name: sync-api
description: Reconcile the SDK against the Mollie API spec — checks and optionally fixes types, JSDoc, enums, deprecations, endpoint coverage, and helper wiring. Use when verifying or syncing the SDK with the official API for a single endpoint, a resource, or the whole SDK.
---

# Sync Types with Mollie API

Compare the SDK's TypeScript types against Mollie's master OpenAPI spec and optionally apply fixes. A bundled toolchain does the **deterministic** work (fetch, resolve, flatten, diff); you apply the **judgment** (Pick-vs-inline, nullability, breaking changes, deprecation, JSDoc). Spend your tokens on judgment, not on parsing JSON.

## Usage

`/sync-api <target> [--only structure,docs,wiring]`

`<target>` is a **single token** — one of:

- **operationId** (e.g. `get-payment`, `create-refund`) — one endpoint
- **resource** (e.g. `refunds`, `payments`) — every endpoint of that resource
- **all** — every resource (parallel agents, one per resource)

`--only` scopes which phases run (default: all three). "just sync the docs" → `--only docs`. If the target doesn't match a known operationId (via `extract-spec.mjs --index`) or resource directory, ask rather than guessing.

## Source of truth

The master spec `mollie/openapi:specs.yaml` (operationId **is** the endpoint key, complete, all `$ref`s local). The toolchain fetches and caches it (ETag-validated) under `.tmp/sync-api/`.

**Do NOT hand-fetch doc pages to read schemas.** Doc-site slugs are inconsistent with operationIds (e.g. spec `list-chargebacks` = doc `list-payment-chargebacks`; `create-payment-refund.md` 404s — it's `create-refund`) and a wrong slug returns a 200-status 404 page that parses as an empty "in sync" result. Doc pages are only used for `@see` URLs, always HTTP-200-verified before writing (see `references/apply.md`).

## Toolchain (`scripts/`, run via Bash)

Run from the **repo root** (paths below are repo-root-relative; the scripts resolve the repo root themselves, so the working directory only matters for locating the script file).

| Command | Output |
|---|---|
| `node .claude/skills/sync-api/scripts/extract-spec.mjs --index` | every operation: `METHOD path -> operationId` |
| `node .claude/skills/sync-api/scripts/extract-spec.mjs <operationId> [--side response\|request\|params] [--show\|--json]` | bare: summary + self-check status. `--show`: rendered digest. `--json`: digest rows. Default side: `response` (GET) / `request` (POST/PATCH/PUT). |
| `node .claude/skills/sync-api/scripts/extract-spec.mjs <operationId> --meta [--json]` | the **operation's** own `summary` / `description` / `deprecated` — the anchor for the binder-method JSDoc check (Phase 2) |
| `node .claude/skills/sync-api/scripts/extract-sdk.mjs <file.ts> [--json]` | SDK structural map: `Pick`/`PickOptional`/inline/heritage, JSDoc, `@see`, **duplicate fields**; for a binder, also `.methods[]` (method name + JSDoc + `@see`) |
| `node .claude/skills/sync-api/scripts/diff.mjs <operationId> <file.ts> <TypeName>` | deterministic field delta: missing / extra / type+doc drift. Side is chosen from the SDK type (see below); `readOnly`/`writeOnly` filtered accordingly; bases resolved (incl. cross-file). Field-level only — method JSDoc is Phase 2. |

The digest preserves every description **verbatim** — that prose (deprecations, constraints, access restrictions, method-specific relevance) is the core value and the scripts never summarize it. If `extract-spec.mjs` exits **non-zero on a digest**, a description was dropped — treat as a bug, do not proceed on partial data. (A missing *side* — e.g. a `204 No Content` response, or a GET with no query params — is a clean exit 0 with empty output, not an error.) The spec is fetched once and cached; a recent cache is reused without a network call. Offline → it warns once and uses the cache; pass `--refresh` to force a re-fetch.

## Step 1 — Analyze

For each operation in scope:

1. **Discover** the SDK side. Glob the resource's files (`src/data/**/<resource>/*.ts`, `src/binders/**/<resource>/*.ts`); run `extract-sdk.mjs <data.ts> --json` and `extract-sdk.mjs <parameters.ts> --json` to see the exported types.
2. **Run `diff.mjs`** for each operation against its SDK mirror(s). An operation has up to **two** mirrors, and `diff.mjs` picks the comparison side automatically from the SDK type you pass:
   - **Response** ↔ the resource's `Data` interface — `diff <op> <data.ts> <ResourceData>` (every GET/POST/PATCH that returns a body).
   - **Request body + query params** ↔ the operation's `*Parameters` type — `diff <op> <parameters.ts> <OpParameters>` (`Create*`/`Update*` for body; `Get*`/`Page*`/`Iterate*` for query params; `Cancel*`/`Delete*` for `testmode`-only bodies).

   Run both where both exist. The diff is the mechanical delta; spend judgment on it, not on re-deriving it.
3. **Apply judgment** over the delta + the verbatim descriptions, across three phases **in order** (each depends on the previous being resolved):

### Phase 1 — Structure

Resolve the `diff` "MISSING" / "IN SDK not in spec" / type findings:

- **Missing fields** — add with `?` optional by default, always with JSDoc (the spec description, verbatim) and an `@see` link.
- **Where a request field lives — `Pick` vs inline (the hardest call):** a field belongs **inline** in `parameters.ts` ONLY if (a) it exists on no `Data` interface anywhere in `src/data/` (request-only / `writeOnly`, e.g. `cardToken`, `dueDate`), OR (b) the spec genuinely differs between request and response for that field (different description, constraints, or type — compare both). Otherwise use `Pick`/`PickOptional` from the owning `Data` interface. `extract-sdk.mjs` flags fields defined via `Pick` **and** inline (`⚠️ DUPLICATES`) — those must be deduplicated to `Pick`/`PickOptional` (verify the `Data` interface's JSDoc is complete first, since it becomes canonical).
- **Always `Pick`, never `Omit`** — `Omit` silently leaks newly-added source fields.
- **"IN SDK, not in spec" — never auto-remove; judge over-declaration vs spec-incompleteness.** Param-absence is a *proxy*, not proof. When the spec's operation description explains the absence, `diff.mjs` appends it as `— spec note: "…"` — that prose is authoritative (e.g. `testmode` on the terminals pairing endpoints: *"does not support test mode yet"* → a real over-declaration; mind the **"yet"** — the answer may be "keep, support is imminent"). With **no** spec note (e.g. `testmode` on the live-only settlement endpoints), it's a softer call — genuinely unsupported, or just unlisted by Mollie? Flag under "Needs attention" either way.
- **`_links` / `_embedded` entries are structure too** — `diff.mjs` flags a missing link/embed property as `[P1] _links.<name>: in spec, not on <Links interface>`. Add the property (e.g. to the `*Links` interface) with JSDoc, exactly like any other field. (The *helper* for it is a separate concern — Phase 3.)
- **Response-only (`readOnly`) fields on shared interfaces** stay **required** on the `Data` interface (matching the response); the request strips them via `Pick`. Never weaken a response type because a field isn't sent in requests.
- **Enums / types** — add missing enum values; fix genuine type mismatches.

**Nullable vs optional (see CLAUDE.md for the project convention):**
- On **request** fields, spec `type: [..,'null']` does **NOT** mean `T | null`. Sending `null` to clear a field is a distinct semantic most Mollie fields don't support — default to `T` unless the description explicitly says `null` clears the value.
- Never downgrade an existing `Nullable<T>` (confirmed behavior). Don't auto-flip optionality from the spec — the docs are unreliable here.

**⚠️ BREAKING CHANGES — warn loudly, never auto-apply.** Removing/renaming a field/type/enum/method; optional→required on a request param; **required→optional on a response field** (breaks consumers doing `obj.field.prop`, even if the spec says optional — the SDK may keep it required based on observed behavior); type changes. Prefix with `⚠️ BREAKING:` under "Needs attention", explain why, and prefer non-breaking alternatives (add alongside, `@deprecated` the old, union types). Response optionality changes require explicit user confirmation.

### Phase 2 — Documentation

On the **final** field locations (after Phase 1):

- **Deprecation** — check the digest's `deprecated` flag, `xDeprecatedEnum`, AND the description prose ("will be ignored", "no longer supported", "use X instead"). Any deprecation → `@deprecated` JSDoc tag on the SDK field/method.
- **JSDoc drift / content loss** — `diff.mjs` flags `no-JSDoc` and `JSDoc may drop N spec sentence(s)` (the SDK JSDoc lost content the spec has). This is **coverage, not verbatim** — the goal is that the spec's information is *reflected* in the code, not copied word-for-word. Apply judgment:
  - **Intentional drift is fine** — SDK-specific notes, or corrections where the docs are wrong (e.g. docs say a field is required but it isn't). Keep these; a flag here just means "confirm it's deliberate".
  - **Accidental truncation is not** — a dropped sentence with no reason (constraints, possible values, method-specific relevance) should be restored from the spec description.
  - **Ignore the shared `Amount`/`URL` boilerplate** ("In v2 endpoints, monetary amounts/URLs are represented as objects…") — it lives on the shared `Amount`/`Url` type, not repeated per field; its absence is not a gap.
- **`@see` format** — `diff.mjs` flags `old-@see-format` (`/reference/v2/<api>/...` → `/reference/...`). For bulk, state the count.
- **Binder method JSDoc** — `diff.mjs` does NOT cover this (it's method-level, not field-level), so it must be done explicitly. Run `extract-spec.mjs <op> --meta` (the operation's `summary`/`description`/`deprecated`) and `extract-sdk.mjs <binder> --json` (`.methods[]` with JSDoc + `@see`); map each method to its operation via its `@see` slug. Then flag:
  - **`@deprecated` mismatch** (mechanical) — operation `deprecated: true` but the method JSDoc lacks `@deprecated`, or vice versa.
  - **Factual drift** (judgment) — product claims, supported-method lists, or legacy-flow references in the method JSDoc that the operation `description` contradicts or no longer mentions (e.g. "supports Cards and Klarna", an Orders-shipment flow). Ignore mere wording differences.

### Phase 3 — Wiring (helper coverage)

An **invariant over the current state**: every `_links` / `_embedded` entry the SDK declares should have a corresponding helper — *regardless of whether the entry was just added (Phase 1) or has been there all along*. (Existence + correctness of the entry itself is Phase 1/2; this phase only asks "is there a helper for it?")

`diff.mjs` flags `[P3] _links.<name>: no helper (expected get/has<Name>[Url]) — Helper class: <file | NONE — must be created>`. For each, add the helper using the right pattern (list→`HelpfulIterator` + `hasX`; single resource→`getX`; URL-only→`getXUrl`), creating the resource's `*Helper.ts` if none exists. **See `references/wiring.md`** for the patterns and the 4-file `_embedded` procedure. Base `self`/`documentation` are never helper-exposed and aren't flagged.

4. **Report** — issues only, grouped by phase; omit empty phases; counts for bulk items; field path + what differs + `file:line` for individual ones. Never auto-remove SDK fields absent from the spec — flag under "Needs attention". Then a **Summary**: **Doc-synced** (no type change), **Added**, **Needs attention** (omit empty categories).

## Step 2 — Apply

1. **Ask which phases/categories to apply.** If the user selects nothing to change, stop here — there are no edits to make, so the working tree is never touched.
2. **Only if changes will be made, check the working tree is clean** (do this *after* the selection, *before* the first edit). Run `git status --porcelain --untracked-files=no` (the gitignored `.tmp/` cache and untracked files are correctly excluded). If it shows **uncommitted changes to tracked files**, STOP and ask the user — sync edits would interleave with their existing work, muddying the diff. Lead with the safer option (the tree is already dirty, which is the only reason this prompt appears): (a) **isolate in a fresh worktree (recommended/default)** — `git worktree add ../mollie-api-node-sync-<target> -b sync/<target>` (clean checkout of the current commit; their WIP stays put); or (b) apply here anyway (sync edits interleave with the existing changes). Do not proceed until they choose.
3. **Read `references/apply.md`** (Pick/PickOptional mechanics + the mandatory pre-check, `@see` format + verify-before-write, intersection/empty-interface style) and apply edits **in phase order**.

**Post-apply gate (MANDATORY):** after edits, run `yarn build:declarations` (typechecks the whole graph via `src/types.ts`, ~2s) and `npx eslint --ext .ts src/<touched dirs>`, then `npx prettier --write <touched files only>` (NOT `yarn lint` — it reformats the whole tree). Fix any diagnostics before reporting done. The gate proves edits are type-valid; it does **not** validate optionality/breaking-change judgment — those stay under "Needs attention".

**Post-apply description-coverage review:** re-run `diff.mjs` on each edited `(op, type)` pair and look at the `JSDoc may drop …` flags. This catches the common failure where the apply step **shortened a description while writing JSDoc** — especially on **newly-added fields**, where a coverage gap is almost certainly accidental truncation (you just added it from the spec — restore the dropped content). For pre-existing fields, judge intentional drift vs accidental per the Phase 2 rules. This is a **review, not a hard gate** — fix accidental loss, keep deliberate deviations.

## Parallelization

For a resource or `all`, fan out **one agent per resource** (never per endpoint — the request-vs-response `Pick` decision needs both specs in one context; never per check — the phases are dependency-ordered). Each agent runs the full analyze step for its resource and writes verbatim findings to `.tmp/sync-api/report-<resource>.json` (apply reads these, immune to context summarization). Use the contract in **`references/agent-prompt.md`**. `--only` scopes each agent's phases.
