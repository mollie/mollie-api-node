// If support for Node.js < 10.0.0 is ever dropped, this import can be removed.
import { URL } from 'url';

import buildFromEntries from '../plumbing/buildFromEntries';

/**
 * Returns the parsed search parameters from the passed URL. For example: `'https://example.com?id=5'` is converted to
 * `{ id: 5 }` (and `'https://example.com'` is converted to `{}`).
 *
 * If multiple parameters have the same key (`'https://example.com?id=5&id=6'`), exactly one of them will be
 * represented in the returned object.
 */
export default function parseQueryInUrl(url: string) {
  return buildFromEntries(new URL(url).searchParams);
}