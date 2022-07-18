// If support for Node.js < 10.0.0 is ever dropped, this import can be removed.
import { URLSearchParams } from 'url';

import getEntries from '../plumbing/getEntries';

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
  if (searchParameters == undefined) {
    return originAndPathname;
  }
  const searchEntries = getEntries(searchParameters);
  if (searchEntries.length == 0) {
    return originAndPathname;
  }
  return `${originAndPathname}?${new URLSearchParams(
    searchEntries.reduce((result, [key, value]: [string, string | number | string[] | number[] | Record<string, string | number> | undefined]) => {
      if (value == undefined) {
        return result;
      }
      if (typeof value == 'object' && !Array.isArray(value)) {
        getEntries(value).forEach(([innerKey, innerValue]) => (result[`${key}[${innerKey}]`] = String(innerValue)));
      } /* if (typeof value != 'object' || Array.isArray(value)) */ else {
        result[key] = String(value);
      }
      return result;
    }, {} as Record<string, string | string[]>),
  )}`;
}
