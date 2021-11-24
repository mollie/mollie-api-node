const replaceArguments = [/(?:^|-+)(\w?)/g, (_: string, character: string) => character.toUpperCase()] as const;

/**
 * Returns the passed input with all dashes (`'-'`) removed, and the first character as well as any character which
 * appears directly after a dash converted to upper case. `'bananas'` → `'Bananas'`. `'summer-day'` → `'SummerDay'`.
 */
export default function capitalize(input: string) {
  return input.replace(...replaceArguments);
}
