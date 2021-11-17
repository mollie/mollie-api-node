import { stringify as stringifyToQueryString } from 'querystring';

import getEntries from '../plumbing/getEntries';

/**
 * Returns a stringified version of the passed query to be used as the search portion of a URL. For example:
 * `{ id: 5 }` is converted to `'?id=5'` (and `{}` is converted to `''`).
 */
export default function stringifyQuery(input: Record<string, any>): string {
  const entries = getEntries(input);
  if (entries.length == 0) {
    return '';
  }
  return `?${stringifyToQueryString(
    entries.reduce<Record<string, any>>((result, [key, value]) => {
      if (Array.isArray(value)) {
        result[key] = value.join();
      } else if (/* Array.isArray(value) == false && */ typeof value == 'object') {
        getEntries(value).forEach(([innerKey, innerValue]) => (result[`${key}[${innerKey}]`] = innerValue));
      } /* if (typeof value != 'object') */ else {
        result[key] = value;
      }
      return result;
    }, {}),
  )}`;
}
