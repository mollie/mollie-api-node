import { apply } from 'ruply';

function createDescriptor<T>(value: T) {
  return {
    configurable: true,
    /* enumerable: false, */
    writable: true,
    value,
  } satisfies PropertyDescriptor;
}

/**
 * Defines new properties on the passed target object which take the value of the original property. The newly defined
 * properties are not enumerable and purposely do not exist in the TypeScript type of the target object.
 */
export default function alias<T, P extends keyof T>(target: T, aliases: Record<P, Array<string> | string>) {
  Object.defineProperties(
    target,
    (Object.entries(aliases) as Array<[P, Array<string> | string]>).reduce(
      (descriptors, [property, aliases]) =>
        apply(descriptors, descriptors => {
          if (Array.isArray(aliases)) {
            aliases.forEach(alias => (descriptors[alias] = createDescriptor(target[property])));
          } /* if ('string' == typeof aliases) */ else {
            descriptors[aliases as string] = createDescriptor(target[property]);
          }
        }),
      {} as PropertyDescriptorMap,
    ),
  );
}
