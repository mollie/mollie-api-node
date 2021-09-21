/**
 * Returns an array of the passed object's own enumerable string-keyed property `[key, value]` pairs.
 *
 * If support for Node.js < 7.0.0 is ever dropped, this function can be removed in favour of `Object.entries`.
 */
export default ((): (<T>(input: Record<string, T>) => [string, T][]) => {
  if (Object.entries != undefined) {
    return Object.entries;
  }
  return function getEntries<T>(input: Record<string, T>) {
    return Object.keys(input).map(key => [key, input[key]]);
  };
})();
