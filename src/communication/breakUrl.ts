// The following line is only necessary for Node.js < 10.0.0, which we only secretly support. Should we ever drop that support completely, we can remove this import.
import { URL } from 'url';

import buildFromEntries from '../plumbing/buildFromEntries';

/**
 * Breaks the passed URL into a pair of the pathname+origin and the search parameters. For example:
 * `'https://example.com?id=5'` is converted to `['https://example.com', { id: 5 }]` and `'https://example.com'` is
 * converted to `['https://example.com', {}]`.
 *
 * If multiple parameters have the same key (`'https://example.com?id=5&id=6'`), exactly one of them will be
 * represented in the returned search parameters object.
 *
 * The passed URL is expceted not to contain a hash.
 *
 * This function is designed to be the reverse of `buildUrl`. However, as that function accepts search parameters which
 * are numbers, arrays, or objects, and includes them in the URL. The type information of the search parameters is lost
 * in the process, and not recovered by this function. For example:
 * `breakUrl(buildUrl('https://example.com', { id: 5 }))` is converted to `['https://example.com', { id: '5' }]` (note
 * how 5 is now a string).
 */
export default function breakUrl(input: string) {
  const parsed = new URL(input);
  return [buildFromEntries(parsed.searchParams), ((parsed.search = ''), parsed.toString())].reverse() as [string, Record<string, string>];
}
