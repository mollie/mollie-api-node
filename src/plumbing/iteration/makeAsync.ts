/**
 * Converts a (synchronous) iterator to an asynchronous iterator.
 */
export default function makeAsync<T, R, N>(original: Iterator<T, R, N>) {
  return {
    next() {
      return Promise.resolve(original.next());
    },

    return(value?: R) {
      return Promise.resolve(original.return?.(value) ?? { done: true, value: value as R });
    },

    throw(error: any) {
      return Promise.resolve(original.throw?.(error) ?? ({ done: true } as IteratorReturnResult<R>));
    },
  };
}
