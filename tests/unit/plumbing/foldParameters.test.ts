import foldParameters from '../../../src/plumbing/foldParameters';

test('movesValueToTargetAndRemovesSource', () => {
  const result = foldParameters({ include: 'payment', embed: undefined as string | undefined }, { embed: ['include'] });
  expect(result).toStrictEqual({ embed: 'payment' });
  expect('include' in result).toBe(false);
});

test('acceptsASingleSourceAsWellAsAnArray', () => {
  const result = foldParameters({ include: 'payment', embed: undefined as string | undefined }, { embed: 'include' });
  expect(result).toStrictEqual({ embed: 'payment' });
});

test('keepsExistingTargetValueOverSource', () => {
  const result = foldParameters({ include: 'old', embed: 'new' as string | undefined }, { embed: ['include'] });
  expect(result).toStrictEqual({ embed: 'new' });
});

test('removesSourceEvenWhenItsValueIsUndefined', () => {
  // `toStrictEqual` (unlike `toEqual`) does not ignore undefined-valued keys, so this asserts the key is gone.
  const result = foldParameters({ include: undefined as string | undefined, embed: 1 }, { embed: ['include'] });
  expect(result).toStrictEqual({ embed: 1 });
  expect('include' in result).toBe(false);
});

test('ignoresSourcesThatAreNotPresent', () => {
  const result = foldParameters({ embed: 5 } as { include?: string; embed?: number }, { embed: ['include'] });
  expect(result).toStrictEqual({ embed: 5 });
});

test('preservesUnrelatedParameters', () => {
  const result = foldParameters({ include: 'payment', embed: undefined as string | undefined, testmode: true }, { embed: ['include'] });
  expect(result).toStrictEqual({ embed: 'payment', testmode: true });
});

test('doesNotMutateTheInput', () => {
  const input = { include: 'payment', embed: undefined as string | undefined };
  foldParameters(input, { embed: ['include'] });
  expect(input).toStrictEqual({ include: 'payment', embed: undefined });
});
