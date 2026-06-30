# Contributing

Thanks for helping make the Mollie API client for Node.js better. This document covers how to report issues, set up the project, and get a change merged and released.

## Reporting issues

Bugs and feature requests are tracked as [GitHub issues](https://github.com/mollie/mollie-api-node/issues). Before opening one, please search existing issues to avoid duplicates, and include a minimal reproduction (SDK version, Node version, and a code snippet) where relevant.

## Reporting security vulnerabilities

**Do not report security issues through public GitHub issues.** Mollie operates a responsible disclosure program — please email [responsible-disclosure@mollie.com](mailto:responsible-disclosure@mollie.com) and follow the [responsible disclosure policy](https://www.mollie.com/legal/responsible-disclosure).

## Development

Requires a recent LTS release of Node.js and [Yarn](https://yarnpkg.com/) (Classic).

```bash
yarn                # install dependencies
yarn build          # bundle (CJS + ESM) and emit TypeScript declarations
yarn test           # run the full Jest test suite
yarn lint           # ESLint (fix) + Prettier
```

### Tests

- `yarn test` runs everything. The **integration** tests (`tests/integration`) hit the live Mollie API and require a test-mode API key in the `API_KEY` environment variable — get one from your [dashboard](https://www.mollie.com/dashboard/developers/api-keys).
- To run only the **unit** tests (no API key needed): `yarn test:unit`.

### Code style

Linting and formatting are enforced with ESLint and Prettier. Run `yarn lint` before committing, or wire it into your editor.

### Commit messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/). The first line must be a conventional commit (`feat:`, `fix:`, `chore:`, …); the changelog is derived from it. You can use `yarn commit` for an interactive [commitizen](https://commitizen-tools.github.io/commitizen/) prompt that formats the message for you.

## Pull requests

- Open pull requests against `master`.
- Make sure `yarn test` and `yarn lint` pass, and that CI (tests + CodeQL) is green.
- Every PR requires at least one review approval before it can be merged.

## Releasing

Releases are published to npm **automatically** by [`.github/workflows/publish.yml`](.github/workflows/publish.yml) when a GitHub Release is published. Authentication uses [npm Trusted Publishing (OIDC)](https://docs.npmjs.com/trusted-publishers) — there is no npm token, and there is no manual `npm publish` step.

> ⚠️ **Publishing the GitHub Release is the point of no return.** It immediately triggers the publish workflow, so it must be the *last* step. Do all verification *before* you bump the version — by the time you create the Release, everything must already be green.

### 1. Verify — before touching the version

Start from an up-to-date `master` with everything that belongs in the release already merged, then confirm locally:

- `yarn build` succeeds.
- `yarn test` passes — the **full** suite. The integration tests hit the live API and need `API_KEY` set; the publish workflow only runs `yarn test:unit`, so integration coverage is exercised *only* if you run it here.
- `yarn lint` is clean.
- `CHANGELOG.md` has an entry for the new version.

### 2. Bump the version — via a release PR

`master` is protected, so the bump rides in through a PR like any other change; it cannot be pushed directly.

- On a release branch (e.g. `chore/release-x-y-z`), run `npm version <major|minor|patch>` — bumps `package.json` and creates the release commit and a local `vX.Y.Z` tag.
- Push the **branch only** (not the tag yet) and open the release PR; get it approved.

### 3. Push the tag, then merge

- **Push the tag only once the PR is approved:** `git push origin vX.Y.Z`. Pushing it earlier risks a stale tag — if review forces any change to the PR, the tag would point at outdated content, and you would have to delete the remote tag, re-tag, and push again.
- Merge the PR. Use a **merge commit** if you want the tag to stay an ancestor of `master`; squash/rebase rewrites the commit and leaves the tag off-master (fine for publishing either way).

### 4. Publish the GitHub Release — this triggers publishing

Publish a [GitHub Release](https://github.com/mollie/mollie-api-node/releases) for the new tag. This starts the workflow, which then:

- verifies the release tag matches the `package.json` version (and fails loudly if not),
- builds the package and runs the unit tests,
- publishes to npm with provenance, routing prereleases (e.g. `4.4.0-rc.1`) to their own dist-tag (`rc`, `beta`, …) so they never become the default `latest` install.

These workflow checks are a last-resort guard, not a substitute for step 1: if they fail, nothing is published — but the Release and tag already exist, leaving a half-cut release to undo. Keep real verification in step 1.

Permission to create the tag / publish the release is governed by the repository's tag/release ruleset.
