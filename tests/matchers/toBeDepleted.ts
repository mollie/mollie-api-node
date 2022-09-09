import { Interceptor } from 'nock';

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeDepleted(): Promise<CustomMatcherResult>;
    }
  }
}

expect.extend({
  toBeDepleted(received: Interceptor & { counter: number }) {
    const { isNot } = this;
    const pass = received.counter == 0;
    return {
      pass,
      message: () =>
        'expect(interceptor).toBeDepleted()' + //
        '\n\n' +
        `Expected an interceptor with count${isNot ? ' greater than' : ''}: 0\n` +
        `Received an interceptor with count: ${received.counter}`,
    };
  },
});
