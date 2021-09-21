/**
 * Returns an object generated from the passed a list of key-value pairs.
 *
 * If support for Node.js < 12.0.0 is ever dropped, this function can be removed in favour of `Object.fromEntries`.
 */
export default ((): (<T>(input: Iterable<readonly [string, T]>) => Record<string, T>) => {
  if (Object.fromEntries != undefined) {
    return Object.fromEntries;
  }
  return function buildFromEntries<T>(input: Iterable<readonly [string, T]>) {
    const result: Record<string, T> = {};
    Array.from(input, ([key, value]) => (result[key] = value));
    return result;
  };
})();
