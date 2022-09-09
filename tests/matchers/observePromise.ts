const pending = Symbol('pending');
const fulfilled = Symbol('fulfilled');
const rejected = Symbol('rejected');

type State = typeof pending | typeof fulfilled | typeof rejected;

type ObservedPromise<T> = Promise<T> & { state: State; result: any };

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBePending(): jest.CustomMatcherResult;
      toBeFulfilledWith(expected: any): jest.CustomMatcherResult;
      toBeRejectedWith(expected: any): jest.CustomMatcherResult;
    }
  }
}

/**
 * Allows the `toBePending`, `toBeFulfilledWith`, and `toBeRejectedWith` matchers to be used on the passed promise,
 * then returns this promise.
 */
export default function observePromise<T>(promise: Promise<T>) {
  const observedPromise = promise as ObservedPromise<T>;
  observedPromise.state = pending;
  promise.then(
    value => {
      observedPromise.state = fulfilled;
      observedPromise.result = value;
    },
    reason => {
      observedPromise.state = rejected;
      observedPromise.result = reason;
    },
  );
  return observedPromise;
}

function createMatcher(matcherCall: string, expectedState: State, compareResult: boolean) {
  function formatResult(state: State, result: any) {
    switch (state) {
      case pending:
        return '';
      case fulfilled:
        return ` with value ${result}`;
      case rejected:
        return ` with reason ${result}`;
    }
  }
  return function matcher(this: jest.MatcherContext, received: ObservedPromise<any>, expectedResult?: any) {
    const { isNot } = this;
    let pass = received.state == expectedState;
    if (compareResult) {
      try {
        expect(received.result).toEqual(expectedResult);
      } catch (error) {
        pass = false;
      }
    }
    return {
      pass,
      message: () =>
        `expect(received).${matcherCall}` +
        '\n\n' +
        `Expected ${isNot ? 'not ' : ''}a ${expectedState.description} promise${formatResult(expectedState, expectedResult)}\n` +
        `Received a ${received.state.description} promise${formatResult(received.state, received.result)}`,
    };
  };
}
expect.extend({
  toBePending: createMatcher('toBePending()', pending, false),
  toBeFulfilledWith: createMatcher('toBeFulfilledWith(expected)', fulfilled, true),
  toBeRejectedWith: createMatcher('toBeRejectedWith(expected)', rejected, true),
});
