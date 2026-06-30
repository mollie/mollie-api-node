import { apply } from 'ruply';
import { type ParameterDefaults } from '../Options';
import type Maybe from '../types/Maybe';

type NonFunction<T> = T extends (...args: any) => unknown ? never : T;

/**
 * The parameters object accepted by a binder method ‒ its single non-callback object argument. Methods in this library
 * take the shape `(id?, parameters?, callback?)`, so this extracts the `parameters` type regardless of whether an `id`
 * precedes it (the `id` is a `string`, the callback is a function, both of which are filtered out).
 */
type ParametersObject<F> = F extends (...args: any) => unknown ? NonFunction<Extract<Parameters<F>[number], object>> : never;

/**
 * Maps each method of a binder to the client-default keys that method's parameters actually declare. Listing a key a
 * method does not accept is a compile error, which prevents configuring a default the Mollie API would reject. (A
 * homomorphic mapped type ‒ rather than a filtered one ‒ so it resolves against the polymorphic `this` at the call
 * site; non-method properties resolve to `never` parameters and are simply never listed.)
 */
type DefaultsConfig<T> = {
  [P in keyof T]?: Array<keyof ParameterDefaults & keyof ParametersObject<T[P]>>;
};

/**
 * Returns a copy of `parameters` with `defaults` filled in for the passed `keys`, but only where the parameters do not
 * already specify a value. Per-call values (including `false`) take precedence, and the input is never mutated. When no
 * default applies, the input object is returned unchanged by reference ‒ so callers can tell whether anything was filled.
 */
function applyDefaults(defaults: Maybe<Readonly<ParameterDefaults>>, parameters: Record<string, unknown>, keys: Array<keyof ParameterDefaults>) {
  if (defaults == undefined) {
    return parameters;
  }
  let result = parameters;
  for (const key of keys) {
    const value = defaults[key];
    if (value !== undefined && result[key] === undefined) {
      result = result === parameters ? { ...parameters } : result;
      result[key] = value;
    }
  }
  return result;
}

/**
 * Wraps the binder methods named in `config` so that, when called, the client-level `defaults` are filled into the
 * method's parameters object for the listed keys ‒ but only where the caller did not already specify a value. The
 * wrapped methods are otherwise unchanged, and the passed parameters object is never mutated.
 *
 * Like `alias`, this is meant to be called from a binder constructor. It must be called BEFORE `alias`, so that any
 * aliases are created from the wrapped methods.
 */
export default function withParameterDefaults<T extends object>(target: T, networkClient: { parameterDefaults?: Readonly<ParameterDefaults> }, config: DefaultsConfig<T>) {
  Object.defineProperties(
    target,
    Object.entries(config).reduce(
      (descriptors, [method, keys]) =>
        apply(descriptors, descriptors => {
          // Capture the original method before it is redefined, so the wrapper does not end up calling itself.
          const original = (target as Record<string, (...args: unknown[]) => unknown>)[method];
          descriptors[method] = {
            configurable: true,
            writable: true,
            // (no `enumerable` ‒ the wrappers stay non-enumerable, like the prototype methods they shadow)
            value(this: unknown, ...args: unknown[]) {
              // The parameters object sits just before a trailing callback (or is the last argument). The `id` is a
              // string and the callback is a function, so a non-string at that position is the parameters ‒ which the
              // caller may have passed explicitly as `undefined`, equivalent to `{}`.
              const slot = typeof args[args.length - 1] == 'function' ? args.length - 1 : args.length;
              const parameters = args[slot - 1];
              const hasParameters = parameters != null && typeof parameters == 'object';
              const base = (hasParameters ? parameters : {}) as Record<string, unknown>;
              const filled = applyDefaults(networkClient.parameterDefaults, base, keys as Array<keyof ParameterDefaults>);
              // Nothing was filled (no defaults apply, or the call already set them) ‒ leave the arguments untouched.
              if (filled === base) {
                return original.apply(this, args);
              }
              // Replace the parameters slot when it is occupied ‒ by an object, or by an explicit `undefined`/`null`
              // standing in for `{}`. Otherwise only a leading `id` (a string) or nothing was passed, so insert the
              // filled object before any trailing callback.
              if (slot >= 1 && typeof parameters != 'string') {
                args[slot - 1] = filled;
              } else {
                args.splice(slot, 0, filled);
              }
              return original.apply(this, args);
            },
          };
        }),
      {} as PropertyDescriptorMap,
    ),
  );
}
