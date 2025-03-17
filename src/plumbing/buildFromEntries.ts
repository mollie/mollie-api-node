/**
 * Returns an object generated from the passed a list of key-value pairs.
 *
 * This function only exists to support Node.js < 12.0.0, which we only secretly support. Should we ever drop that
 * support completely, this function can be removed in favour of `Object.fromEntries`.
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
