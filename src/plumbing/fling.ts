/**
 * Like the `throw` keyword, but a function.
 */
export default function fling(error: Error): never;
/**
 * Calls the passed error factory and throws the returned error.
 */
export default function fling(errorFactory: () => Error): never;
export default function fling(errorOrFactory: Error | (() => Error)) {
  throw typeof errorOrFactory == 'function' ? errorOrFactory() : errorOrFactory;
}
