/**
 * Returns the passed input with the first character converted to upper case. `'bananas'` → `'Bananas'`.
 */
export default function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.substring(1);
}
