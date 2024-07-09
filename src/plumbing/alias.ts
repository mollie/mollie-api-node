import { run } from 'ruply';

/**
 * Defines new properties on the passed target object which take the value of the original property. The newly defined
 * properties are not enumerable and purposely do not exist in the TypeScript type of the target object.
 */
export default function alias<T>(target: T, property: keyof T & string, ...aliases: Array<string>) {
  run(
    {
      configurable: true,
      /* enumerable: false, */
      writable: true,
      value: target[property],
    },
    descriptor => aliases.forEach(alias => Object.defineProperty(target, alias, descriptor)),
  );
}
