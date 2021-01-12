import createMollieClient from '../..';

describe('mollie', () => {
  it('should fail when no api key is provided', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => createMollieClient(undefined)).toThrowError(TypeError);
  });
});
