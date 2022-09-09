import 'jest';

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toStartWith(expected: string): CustomMatcherResult;
    }
  }
}

expect.extend({
  toStartWith(received: string, expected: string) {
    const { isNot } = this;
    const pass = received.startsWith(expected);
    return {
      pass,
      message: () =>
        'expect(received).toStartWith(expected)' + //
        '\n\n' +
        `Expected a string which ${isNot ? 'does not start' : 'starts'} with: ${expected}\n` +
        `Received: ${received}`,
    };
  },
});
