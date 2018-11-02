import createHttpClient from '../../src/create-http-client';

describe('create-http-client', () => {
  const httpClient = createHttpClient();

  it('should have a secure baseURL set', () => {
    expect(httpClient.defaults.baseURL).toBe('https://api.mollie.com:443/v2/');
  });

  it('should have some default headers set', () => {
    expect(httpClient.defaults.headers).toHaveProperty('Authorization');
    expect(httpClient.defaults.headers).toHaveProperty('User-Agent');
    expect(httpClient.defaults.headers).toHaveProperty('X-Mollie-User-Agent');
    expect(httpClient.defaults.headers).toHaveProperty('Accept-Encoding');
    expect(httpClient.defaults.headers).toHaveProperty('Content-Type');
  });

  it('should have a custom httpsAgent with cert loaded', () => {
    expect(httpClient.defaults.httpsAgent).toBeDefined();
  });

  it('should have a default params serializer', () => {
    expect(httpClient.defaults.paramsSerializer).toBeDefined();
  });
});
