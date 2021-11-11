// (Converts any character after a word boundary to upper case, except for the first character in the string.)
const firstIteration = [/(?!^)\b\w/g, (character: string) => character.toUpperCase()] as const;
// (Removes all whitespace.)
const secondIteration = [/\s+/g, ''] as const;
/**
 * Converts `'rockenberg commerce'` to `'rockenbergCommerce'`.
 */
export default function dromedaryCase(input: string) {
  return input.replace(...firstIteration).replace(...secondIteration);
}
