import axios from 'axios';

import mollie from 'mollie';
import Payments from 'resources/payments';

const apiKey = 'test_qfwDf8HkFyRy4NgVPCgaAmjnUrC7MA';

describe('mollie', () => {
  it('should fail when an api key is not provided', () => {
    const noApiKey = () => mollie(axios);

    expect(noApiKey).toThrowError(TypeError);
  });

  it('should support axios', () => {
    const getMollieClient = () => mollie(axios, { apiKey });

    expect(getMollieClient).not.toThrow();
    expect(getMollieClient().payments).toBeInstanceOf(Payments);
  });
});
