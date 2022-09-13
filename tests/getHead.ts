/**
 * Returns whether the passed input is thenable (`true`) or not (`false`).
 */
function checkThenable(input: any): input is Promise<any> {
  try {
    var { then } = input;
  } catch (error) {
    return false;
  }
  return 'function' == typeof then;
}

/**
 * Returns the first:
 *  * element of the array to which the passed promise resolves, or
 *  * value produced by the passed async iterator.
 */
export default function getHead<T>(sequence: Promise<Array<T>> | AsyncIterator<T>) {
  if (checkThenable(sequence)) {
    return sequence.then(array => {
      if (array.length == 0) {
        throw new Error('The array to which this promise resolved is empty');
      }
      return array[0];
    });
  } /* if (checkThenable(sequence) == false) */ else {
    return sequence.next().then(({ done, value }) => {
      if (done) {
        throw new Error('The passed iterator produced no values');
      }
      return value as T;
    });
  }
}
