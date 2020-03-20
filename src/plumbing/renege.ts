/**
 * Allows a promise-style method to be called callback-style.
 *
 * Behaves in one of two ways, depending on the type of the last argument:
 *  * If called with a function as the last argument, that argument is considered to be the callback. This function
 *    calls the passed method, forwarding the original arguments (save for the callback). A settlement of the promise
 *    returned during that call will be forwarded to the callback. This function then returns `true`.
 *  * If called with a last argument which is not a function, this function returns `false`.
 */
export default function renege<R>(thisArgument: any, method: (...poppedArguments: any[]) => Promise<R>, ...originalArguments: any[]): boolean {
  const candidate = originalArguments.pop();
  if (typeof candidate == 'function') {
    method.apply(thisArgument, originalArguments)
    .then((result: R) => void candidate(null, result), candidate);
    return true;
  }
  return false;
}