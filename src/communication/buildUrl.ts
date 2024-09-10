// The following line is only necessary for Node.js < 10.0.0, which we only secretly support. Should we ever drop that support completely, we can remove this import.
import { URLSearchParams } from 'url';

import { apply, runIf } from 'ruply';
import type Maybe from '../types/Maybe';

export type SearchParameters = Record<string, any>;

/**
 * Builds a URL from the passed origin+pathname and search parameters. For example: `https://example.com` and
 * `{ id: 5 }` is converted to `https://example.com?id=5`; while `https://example.com` and `undefined` is left as
 * `https://example.com`.
 *
 * Note that the origin+pathname is used verbatim. The origin is optional and a relative URL can be built by omitting
 * it.
 *
 * As expected by the Mollie API:
 *  * search parameters which are arrays are joined with commas (`{ array: [1, 2] }` becomes `?array=1,2`), and
 *  * search parameters which are objects (but not arrays) are flattened (`{ object: { key: 'value' } }` becomes
 *    `?object[key]=value`).
 */
export default function buildUrl(originAndPathname: string, searchParameters?: SearchParameters): string {
  const searchEntries = (runIf(searchParameters, Object.entries) ?? []) as [string, Maybe<string | number | string[] | number[] | Record<string, string | number>>][];
  if (searchEntries.length == 0) {
    return originAndPathname;
  }
  return `${originAndPathname}?${new URLSearchParams(
    apply({} as Record<string, string | string[]>, flattenedEntries => {
      for (const [key, value] of searchEntries) {
        if (value == undefined) {
          continue;
        }
        if (typeof value == 'object' && !Array.isArray(value)) {
          for (const [innerKey, innerValue] of Object.entries(value)) {
            flattenedEntries[`${key}[${innerKey}]`] = String(innerValue);
          }
        } /* if (typeof value != 'object' || Array.isArray(value)) */ else {
          flattenedEntries[key] = String(value);
        }
      }
    }),
  )}`;
}
