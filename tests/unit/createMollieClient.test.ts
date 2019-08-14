import { MollieClient } from '../..';

let mollie;
if (process.env.RUN_THE_ACTUAL_BUILD === 'true' || process.env.RUN_THE_ACTUAL_BUILD === 'cjs') {
  mollie = require('../..');
} else {
  mollie = require('../../src/createMollieClient').default;
}

describe('mollie', () => {
  it('should fail when no api key is provided', () => {
    const noApiKey = (): MollieClient => mollie(undefined);

    expect(noApiKey).toThrowError(TypeError);
  });
});
