import mollie from '../../src/mollie';
import { IMollieApiClient } from '../../src/create-mollie-api';

describe('mollie', () => {
  it('should fail when no api key is provided', () => {
    const noApiKey = (): IMollieApiClient => mollie(undefined);

    expect(noApiKey).toThrowError(TypeError);
  });
});
