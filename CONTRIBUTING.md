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

To cut a release:

1. Update `CHANGELOG.md`.
2. `npm version <major|minor|patch>` — bumps `package.json`, creates a commit and a `vX.Y.Z` tag.
3. `git push --follow-tags` — pushes the commit and the tag.
4. Publish a [GitHub Release](https://github.com/mollie/mollie-api-node/releases) for the new tag. **This is what triggers publishing.**

The workflow then:

- verifies the release tag matches the `package.json` version (and fails loudly if not),
- builds the package and runs the unit tests,
- publishes to npm with provenance, routing prereleases (e.g. `4.4.0-rc.1`) to their own dist-tag (`rc`, `beta`, …) so they never become the default `latest` install.

Permission to create the tag / publish the release is governed by the repository's tag/release ruleset.
