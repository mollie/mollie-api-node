# Apply mechanics

Read this before writing ANY edit. Apply edits in phase order (Phase 1 structure → 2 docs → 3 wiring): JSDoc lands on final field locations, and wiring depends on settled structure.

## 🚫 Working-tree check (before the FIRST edit)

Once the user has chosen what to apply (SKILL.md Step 2.1) and there *are* changes to make — but before writing the first edit:

```bash
git status --porcelain --untracked-files=no
```
Empty → proceed. Non-empty → there are uncommitted changes to tracked files; the sync edits would mix into the user's existing work. **STOP and ask the user** before editing, leading with the safer option (a dirty tree is the only reason you're asking):
- **(a) isolate in a worktree — recommended/default** — `git worktree add ../mollie-api-node-sync-<target> -b sync/<target>` gives a clean checkout of the current commit; their WIP stays in the main tree, and the sync's diff is reviewable on its own branch.
- **(b) apply here** — sync edits interleave with their current changes (only when those are related/throwaway).

Present (a) first as the default; don't pick for them, but lead with the worktree. (The gitignored `.tmp/` cache and untracked files are excluded by `--untracked-files=no`, so they never trip this.)

## 🚫 MANDATORY pre-check before writing a field to `parameters.ts`

Before defining a field **inline** in `parameters.ts`, `Grep src/data/` for that field name to confirm it does not exist on any `Data` interface. (`extract-sdk.mjs` also reports duplicates, but re-confirm at apply time — the per-resource analysis can be provisional, and only the whole-`src/data/` grep has the global view.)

- If it exists on a `Data` interface → use `Pick<Data, 'field'>` (preserves the response's optionality) or `PickOptional<Data, 'field'>` (forces optional) — UNLESS the spec genuinely differs between request and response for that field (compare both schemas: different description, constraints, or a narrower request type). Optionality-only differences use `PickOptional`, not inline duplication.
- Only define inline when the grep confirms it is request-only (`writeOnly`, e.g. `dueDate`, `cardToken`, `applePayPaymentToken`), or the request/response semantics genuinely differ.
- When moving inline → `Pick`/`PickOptional`, first ensure the `Data` interface's JSDoc is complete (enrich from the spec — it becomes the canonical source for both request and response consumers).

Always `Pick`, never `Omit` (see CLAUDE.md / ARCHITECTURE.md for the `Pick`/`PickOptional` pattern).

## Style

**Intersection ordering** — `Pick`/`PickOptional` and named bases first, inline `{ }` block always last:
```ts
export type CreateParameters = Pick<Data, 'a' | 'b'> &
  PickOptional<Data, 'c'> &
  IdempotencyParameter &
  TestModeParameter & {
    inlineField?: string;
  };
```

**No empty interfaces** — use a `type` alias with intersections, not an empty `interface`:
```ts
export type CancelParameters = IdempotencyParameter & TestModeParameter;
```

## `@see` links

Format: `https://docs.mollie.com/reference/<slug>?path=<fieldPath>#<section>`. Keep `?path=` even though the new docs ignore it (future compatibility). Update old `/reference/v2/<api-name>/...` → new `/reference/...` in `data.ts`, `parameters.ts`, AND the binder.

**🚫 Verify every new/changed `@see` slug returns HTTP 200 before writing** — slugs are inconsistent (`get-chargeback` works, `list-chargebacks` does not — it's `list-payment-chargebacks`). Batch-verify with a labelled loop so each result maps to its slug:
```bash
for s in slug-a slug-b; do printf '%s %s\n' "$s" "$(curl -s -L -o /dev/null -w '%{http_code}' "https://docs.mollie.com/reference/$s.md")"; done
```
Any non-200 blocks that specific edit → re-resolve the slug (the operationId is a starting guess, not guaranteed equal to the doc slug).

## Post-apply gate (run before reporting done)

```bash
yarn build:declarations                         # tsc over the whole type graph (~2s); MUST pass
npx eslint --ext .ts src/<dirs you touched>      # clean today; catches lint regressions
npx prettier --write <the files you edited>      # scoped — NOT `yarn lint` (it rewrites the whole tree)
```
A green gate means edits are type-valid and lint-clean. It does **NOT** validate optionality/required↔optional/breaking-change judgment — those remain under "Needs attention" with user confirmation. The repair step fixes only structural breakage the apply introduced; never revert an intentional, user-approved "Needs attention" change.

**Then re-run `diff.mjs` on each edited `(op, type)` to catch description truncation:**
```bash
node .claude/skills/sync-api/scripts/diff.mjs <op> <edited-file.ts> <Type>   # look at "JSDoc may drop …" flags
```
The apply step often shortens a description while writing JSDoc — worst on **newly-added fields** (pure transcription). For an added field, a `JSDoc may drop …` flag is almost certainly accidental truncation → restore the dropped sentence(s) from the spec digest. For pre-existing fields it may be deliberate (SDK note / doc correction) → keep. This is a **review, not a hard gate**; do not enforce verbatim, and ignore the shared `Amount`/`URL` boilerplate.

## Re-run safety

Re-running on an already-synced target must be a no-op: before each edit confirm the target state isn't already present (`Edit` no-ops/fails on unchanged strings); never duplicate a field or re-rewrite a correct `@see`.
