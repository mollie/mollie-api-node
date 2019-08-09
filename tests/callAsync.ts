import { isEqual } from 'lodash';

/**
 * Calls the passed target function twice, forwarding the passed arguments.
 *
 * This can be used to test functions which are supposed to support both the promise-style asynchronous paradigm and
 * the callback-style paradigm.
 *
 * The function is called once with only the passed arguments, and is expected to return a promise in that case. It is
 * also called once with a callback function appended to the passed arguments, in which case the function is expected
 * to call the callback.
 *
 * A promise is returned which resolves to the result of both calls or rejects to the error produced by both calls, or
 * rejects if the two calls do not produce the same outcome.
 */
export default function callAsync(target: Function, thisArgument, ...passingArguments): Promise<any> {
  return new Promise((resolve, reject) => {
    var parkedOutcome /* = undefined */;
    var parkedOutcomeIsResult /* = undefined */;
    function handleResult(value) {
      // If this is the first outcome, park it.
      if (undefined === parkedOutcome) {
        parkedOutcome = value;
        parkedOutcomeIsResult = true;
        // If this is the second (and final) outcome, compare it to the parked outcome.
      } /* if (undefined !== parkedOutcome) */ else {
        if (false == parkedOutcomeIsResult) {
          reject(new Error(`The passed function produced a result once and an error once, the latter being ${parkedOutcome}`));
        } /* if (parkedOutcomeIsResult) */ else {
          if (false == isEqual(parkedOutcome, value)) {
            reject(new Error(`The passed function produced two inequal results, one: ${parkedOutcome} other: ${value}`));
          } /* if (isEqual(parkedOutcome, value)) */ else {
            resolve(value);
          }
        }
      }
    }
    function handleError(value) {
      // If this is the first outcome, park it.
      if (undefined === parkedOutcome) {
        parkedOutcome = value;
        parkedOutcomeIsResult = false;
        // If this is the second (and final) outcome, compare it to the parked outcome.
      } /* if (undefined !== parkedOutcome) */ else {
        if (parkedOutcomeIsResult) {
          reject(new Error(`The passed function produced a result once and an error once, the latter being ${value}`));
        } /* if (false == parkedOutcomeIsResult) */ else {
          if (false == isEqual(parkedOutcome, value)) {
            reject(new Error(`The passed function produced two inequal errors, one: ${parkedOutcome} other: ${value}`));
          } /* if (isEqual(parkedOutcome, value)) */ else {
            reject(value);
          }
        }
      }
    }
    // Call the function with only the passed arguments, expecting it to return a promise.
    const promise = target.call(thisArgument, ...passingArguments);
    if (undefined === promise.then) {
      throw new Error('The passed function does not return a promise (or otherwise thenable object)');
    }
    promise.then(handleResult, handleError);
    // Call the function with an appended callback.
    target.call(thisArgument, ...passingArguments, function callback(error, result) {
      if (null !== error) {
        handleError(error);
      } /* if (null === error) */ else {
        handleResult(result);
      }
    });
  });
}
