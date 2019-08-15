import createMollieClient from '../..';

describe('mollie', () => {
  it('should fail when no api key is provided', () => {
    expect(() => createMollieClient(undefined)).toThrowError(TypeError);
  });
});
