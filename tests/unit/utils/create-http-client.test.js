import axios from 'axios';
import createHttpClient from 'utils/create-http-client';

describe('create-http-client', () => {
  it('should have a secure option', () => {
    const httpClient = createHttpClient(axios, {
      defaultHostname: 'api.mollie.com',
    });

    expect(httpClient.defaults.baseURL).toBe('https://api.mollie.com:443/v1/');
  });

  it('should have a insecure option', () => {
    const httpClient = createHttpClient(axios, {
      insecure: true,
      host: 'api.mollie.com',
    });

    expect(httpClient.defaults.baseURL).toBe('http://api.mollie.com:80/v1/');
  });
});
