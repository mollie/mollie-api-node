# Mollie API Node.js SDK

Official Node.js client (`@mollie/api-client`) for the Mollie Payment API v2.

Resource layer structure (data, binders, helpers, parameters) is documented in `.claude/ARCHITECTURE.md`.

## Commands

```bash
yarn build          # Rollup bundle (CJS + ESM) + TypeScript declarations
yarn test           # Jest tests
yarn test:watch     # Jest watch mode
yarn test:cov       # Coverage report
yarn lint           # ESLint fix + Prettier
```

## Type System — Request vs Response

IMPORTANT: `data.ts` and `parameters.ts` are **not** two views of the same type. They are separate concerns:

- `data/<resource>/data.ts` → **response** shape (what the API returns). This is the source of truth for field names and types.
- `binders/<resource>/parameters.ts` → **request** shape (what the consumer sends). Built by `Pick`/`PickOptional` from the Data interface, plus request-only fields that don't appear in responses (e.g. `applePayPaymentToken`, `cardToken`).

`Pick<Data, ...>` preserves optionality from the response type. `PickOptional<Data, ...>` forces fields optional ("exists on response, but optional to send").

Do NOT add request-only fields to `data.ts` — they belong in `parameters.ts`.

## Helpers and underscore-prefixed fields

Consumers should never access underscore-prefixed properties directly (the `_` prefix denotes private/internal, e.g. `_links`, `_embedded`). Helper methods (e.g. `payment.getRefunds()`) abstract these away — they transparently return embedded data if available, or fetch via the API link if not. This is why helpers exist: a single entry point regardless of whether data was embedded or needs fetching.

## Conventions

- Conventional commits for all commit messages.
- `prefer-rest-params` is intentionally off — the `arguments` object is used deliberately in the renege (promise↔callback) pattern. Don't refactor these to rest params.
- New transformers must be registered in `createMollieClient.ts` alongside the binder wiring.
- Enums and public types are exported from `src/createMollieClient.ts` and `src/types.ts`.

## Release Process

Publishing is automated via `.github/workflows/publish.yml` (npm Trusted Publishing / OIDC) — it runs when a GitHub Release is published. There is **no manual `npm publish`** and no npm token.

`master` is protected, so the version bump rides in through a release PR like any other change — it can't be pushed directly. **Verify before bumping**, and treat publishing the Release as the irreversible final step.

1. **Verify** on up-to-date `master` (all release content merged): `yarn build`, `yarn test` (the **full** suite — the workflow only runs `yarn test:unit`, so integration is covered only here), `yarn lint`, and `CHANGELOG.md` updated.
2. On a release branch: `npm version <major|minor|patch>` (bumps `package.json`, commits, creates the `vX.Y.Z` tag). Push the **branch** and open the release PR.
3. **Push the tag only once the PR is approved** (`git push origin vX.Y.Z`) — pushing it earlier risks a stale tag (delete-and-re-tag) if review forces changes. Merge with a merge-commit to keep the tag on `master`.
4. Once merged, publish a GitHub Release for the tag → the workflow re-verifies the tag matches `package.json`, builds, runs unit tests, and publishes with provenance (prereleases like `-rc.N` go to their own dist-tag, not `latest`).

See `CONTRIBUTING.md` for the maintainer-facing version of this.

## Gotchas

- **Mollie API docs are unreliable for optionality/nullability.** Fields marked `required` may work fine without sending them (e.g. `redirectUrl`). Fields typed as `object` (not nullable) may actually be optional (e.g. `billingAddress`). Fields typed as `string | null` are likely optional too (absent from responses despite not being marked optional). Never auto-apply optionality from the docs — flag discrepancies for manual review instead.
- **Nullable vs optional convention**: `Nullable<T>` (`T | null`) = always present, sometimes null. `T?` = sometimes absent. `?: Nullable<T>` = both. Default to `?` (optional) when uncertain, upgrade to `Nullable<T>` only when confirmed via actual API behavior.
- **Mollie docs .md trick** — append `.md` to any reference page URL (e.g. `https://docs.mollie.com/reference/create-payment.md`) to get plain-text markdown with fully resolved OpenAPI JSON. No browser automation needed. The GitHub repo `mollie/openapi` (`specs.yaml`) has the full spec but uses `$ref`s.
- **node-fetch v2** (CommonJS) is the HTTP client, not native fetch.
- **Node version: README says 14+, `engines` says `>=8` — this mismatch is intentional, do not "fix" it.** The SDK's *code* is expected to run on Node 8+, hence `engines.node: ">=8"`. But the *test environment* won't run on anything older than Node 14, so 14 is the lowest version we can actually verify. The policy: we guarantee it works on 14, and it *probably* works on older versions down to 8 — we just can't prove it. README states 14 (the supported/tested floor); `engines` states 8 (the believed-actual floor). Aligning the two numbers would either drop unverified-but-likely support or claim guarantees we can't back.
