/**
 * `ToIntegerOrInfinity` (see https://tc39.es/ecma262/#sec-tointegerorinfinity) followed by a range check.
 *
 * In short: returns the passed input converted to an integer (rounded down) ‒ unless the passed input converts to
 * `NaN`, in which case `0` is returned; or the input is negative, in which case a `RangeError` is thrown.
 */
export default function convertToNonNegativeInteger(input: unknown) {
  const number = Number(input);
  if (number >= 0 == false) {
    if (isNaN(number)) {
      return 0;
    } /* if (number < 0) */ else {
      throw new RangeError(`Unexpected number ${input}`);
    }
  }
  return Math.floor(number);
}
