import createMollieClient from '../..';

describe('mollie', () => {
  it('should fail when no api key is provided', () => {
    // @ts-ignore
    expect(() => createMollieClient(undefined)).toThrowError(TypeError);
  });
});
