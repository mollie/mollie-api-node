import { runIf } from 'ruply';

type Nullish = null | undefined;

/**
 * Returns a promise which resolves to the passed value; unless the passed value is
 * [nullish](https://developer.mozilla.org/docs/Glossary/Nullish), in which case it returns that value directly.
 */
export default function resolveIf<T>(value: T extends Promise<unknown> ? never : T) {
  return runIf(value, Promise.resolve) ?? (value as Extract<T, Nullish> | Promise<Exclude<T, Nullish>>);
}
