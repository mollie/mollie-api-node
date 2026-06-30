# Per-resource agent contract

When `<target>` is a resource or `all`, fan out **one agent per resource** (never per endpoint — the request-vs-response `Pick` decision needs both specs in one context; never per check — phases are dependency-ordered). Each agent runs the full analyze step for its resource. Build each agent's prompt from this self-contained contract (the agent does NOT inherit SKILL.md):

---

You are syncing the SDK types for the **`<resource>`** resource against Mollie's master OpenAPI spec. Work from the repo root.

**Toolchain (run via Bash, paths relative to repo root):**
- `node .claude/skills/sync-api/scripts/extract-spec.mjs --index` — all operations; filter to this resource's paths.
- `node .claude/skills/sync-api/scripts/extract-sdk.mjs <file.ts> --json` — SDK structural map.
- `node .claude/skills/sync-api/scripts/diff.mjs <operationId> <file.ts> <TypeName>` — deterministic delta per operation. If `extract-spec` exits non-zero, a description was dropped — report it as a tool bug, do not proceed on partial data.

**Steps:**
1. Glob this resource's files (`src/data/**/<resource>/*.ts`, `src/binders/**/<resource>/*.ts`). Run `extract-sdk` on `data.ts` and `parameters.ts` to list exported types.
2. Run `diff.mjs` for each operation against its mirror(s). `diff.mjs` picks the side from the SDK type: a `Data` interface → response body; a `*Parameters` type → request body + query params. Run both where both exist: `diff <op> <data.ts> <ResourceData>` AND `diff <op> <parameters.ts> <OpParameters>`.
3. For every delta entry, **read the field's full `description` from the `extract-spec` digest** and apply judgment per the phase rules below.
4. **Binder method JSDoc** (not covered by `diff.mjs`): run `extract-spec <op> --meta` and `extract-sdk <binder> --json` (`.methods[]`); map each method to its operation via its `@see` slug; flag `@deprecated` mismatches (mechanical) and factual drift — stale product claims / supported-method lists / legacy-flow references the operation `description` no longer supports (judgment; ignore wording).

**Non-negotiable judgment rules:**
1. **Read every field's full description prose** — deprecations, constraints, access restrictions ("only available to marketplace operators"), and method-specific relevance live in TEXT, not structured fields. Carry the **full content** into JSDoc — don't drop sentences. This is coverage, not verbatim: you MAY reword or add SDK-specific notes/corrections, but never *silently shorten*. After applying, re-run `diff.mjs` and resolve `JSDoc may drop …` flags (on a field you just added, that's almost always accidental truncation — restore it; ignore the shared `Amount`/`URL` boilerplate).
2. **Request `type: [..,'null']` ≠ `T | null`** — default to `T` unless the description explicitly says `null` clears the value.
3. **`Pick` vs inline:** a request field goes inline ONLY if it exists on no `Data` interface in `src/data/`, OR the spec genuinely differs between request and response. Otherwise `Pick`/`PickOptional`. State, for each field, whether it exists on a `Data` interface and justify any inline choice.
4. **Deprecation** — check the `deprecated` flag, `xDeprecatedEnum`, AND prose ("will be ignored", "no longer supported", "use X instead"); also the endpoint-level `deprecated`/intro text.
5. **Never** recommend changing a response field required→optional — that's breaking even if the spec marks it optional. Categorize as "Needs attention" with `⚠️ BREAKING`.

**Output:** write verbatim findings to `.tmp/sync-api/report-<resource>.json` — per finding: `{operationId, phase (1|2|3), category (doc-synced|added|needs-attention), field path, file:line, current vs spec, full verbatim description, breaking (bool)}`. The apply step reads this file (immune to context-window summarization), so it must contain the full description text, not a summary. Also return a concise issues-only summary to the orchestrator.

---

The orchestrator collects the per-resource reports into one combined report (grouped by phase, then the Summary). Apply reads the `.tmp/sync-api/report-*.json` files as the source of truth.
