# Phase 3 — Wiring (helper coverage)

Consumers never access `_links`/`_embedded` directly — helper methods abstract them (see CLAUDE.md). Phase 3 is a **coverage invariant**: every link/embed the SDK declares should have a helper, *whether the entry was just added in Phase 1 or already existed*. The entry's existence + JSDoc are Phase 1/2; here you only add the missing **helper**. `diff.mjs` lists each as `[P3] _links.<name>: no helper …`. See ARCHITECTURE.md for the Seal-type / `transform` background.

Discover the Helper and Model via `Glob src/data/**/<resource>/*Helper.ts` and `*.ts` (the Model file, e.g. `Payment.ts`). If no `*Helper.ts` exists for the resource (the diff says `Helper class: NONE`), create one.

## Helper for `_links.<name>`

Add a helper method (the property itself is Phase 1). Choose the pattern by what the link points to:

1. **List of sub-resources** (`refunds`, `chargebacks`, `captures`): helper returns `HelpfulIterator<T>` — checks `_embedded` first, falls back to fetching the link URL. Add a `hasX(): boolean` checking `this.links.x != undefined`. E.g. `getRefunds()` / `hasRefunds()`.
2. **Single related resource** (`order`, `customer`, `mandate`): helper returns `Promise<T> | Promise<undefined>` with a callback overload; uses `breakUrl` + `networkClient.get()`. E.g. `getOrder()`.
3. **URL-only** (`checkout`, `dashboard`): helper returns `Nullable<string>` — `return this.links.x?.href ?? null`. E.g. `getCheckoutUrl()`.

A fetch-style helper (1–2) may need the target resource's Data + Model types imported. If the target resource has no transformer registered in `createMollieClient.ts`, flag it to the user.

## Missing `_embedded.<name>` → four files

1. **`data.ts`** — add to `_embedded` on the Data interface: `captures?: Omit<CaptureData, '_embedded'>[]`.
2. **Model file** (e.g. `Payment.ts`) — add the *transformed* type to the `_embedded` override in the Seal type: `captures?: Capture[]`.
3. **`transform` function** (same file) — map each embedded item through the sub-resource's transform: `_embedded.x = input._embedded.x.map(transformX.bind(undefined, networkClient))`.
4. **Helper** — `getX()` checks `this.embedded?.x` first (no network call), falls back to fetching via `_links.x`. Add the helper if missing (patterns above).

A new embed almost always pairs with a new `_links` entry + helper — flag all together in the report.
