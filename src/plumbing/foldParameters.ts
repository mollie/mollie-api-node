import type MaybeArray from '../types/MaybeArray';

/** The union of every source key referenced in a `folds` map (unwrapping array values). */
type SourceKeys<F> = { [K in keyof F]: F[K] extends ReadonlyArray<infer E> ? E : F[K] }[keyof F];

/**
 * Folds parameters into other parameters, removing the folded-away keys. `folds` maps each target parameter to the
 * source parameter(s) whose value should fold into it: `{ to: ['from'] }` moves `from` onto `to`. A target that already
 * holds a value wins and the source value is discarded. A source key is removed whenever it is present, even when its
 * value is `undefined` — so `{ to: 1, from: undefined }` folds to `{ to: 1 }`, not `{ to: 1, from: undefined }`. Sources
 * that are not present are ignored. Every name — target and source — must exist on the parameter type, so a mistyped
 * name is a compile error rather than a silent no-op.
 */
export default function foldParameters<T extends Record<string, any>, F extends Partial<Record<keyof T, MaybeArray<keyof T>>>>(parameters: T, folds: F): Omit<T, SourceKeys<F> & keyof T> {
  return Object.entries(folds).reduce<Record<string, any>>(
    (result, [to, sources]) =>
      (Array.isArray(sources) ? sources : [sources]).reduce((acc, from) => {
        if (!(from in acc)) {
          return acc;
        }
        const { [from]: value, ...rest } = acc;
        return { ...rest, [to]: acc[to] ?? value };
      }, result),
    parameters,
  ) as Omit<T, SourceKeys<F> & keyof T>;
}
