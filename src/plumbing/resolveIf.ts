type Nullish = null | undefined;

/**
 * Returns a promise which resolves to the passed value; unless the passed value is
 * [nullish](https://developer.mozilla.org/docs/Glossary/Nullish), in which case it returns that value directly.
 */
export default function resolveIf<T>(value: T): Extract<T, Nullish> | Promise<Exclude<T, Nullish>> {
  if (value == null) {
    return value as Extract<T, Nullish>;
  }
  return Promise.resolve(value as Exclude<T, Nullish>);
}
