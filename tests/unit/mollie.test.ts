import { IMollieApiClient } from '../../src/create-mollie-api';

let mollie;
if (process.env.RUN_THE_ACTUAL_BUILD === 'true' || process.env.RUN_THE_ACTUAL_BUILD === 'cjs') {
  mollie = require('../../dist/cjs/mollie');
} else {
  mollie = require('../../src/mollie').default;
}

describe('mollie', () => {
  it('should fail when no api key is provided', () => {
    const noApiKey = (): IMollieApiClient => mollie(undefined);

    expect(noApiKey).toThrowError(TypeError);
  });
});
