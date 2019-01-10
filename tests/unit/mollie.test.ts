import mollie from '../../src/mollie';

describe('mollie', () => {
  it('should fail when no api key is provided', () => {
    const noApiKey = () => mollie(undefined);

    expect(noApiKey).toThrowError(TypeError);
  });
});
