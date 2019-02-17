import createMollieApi from '@root/create-mollie-api';
import createHttpClient from '@root/create-http-client';

const httpClient = createHttpClient({ apiKey: 'test' });
const mollie = createMollieApi({ httpClient });

describe('create-mollie-api', () => {
  it('should add a version string', () => {
    httpClient.defaults.headers['User-Agent'] = '';
    mollie.addVersionString('ReactionCommerce/1.16.0');

    expect(httpClient.defaults.headers['User-Agent']).toEqual('ReactionCommerce/1.16.0');
  });

  it('should accept a version string with whitespace', () => {
    httpClient.defaults.headers['User-Agent'] = '';
    mollie.addVersionString('Reaction Commerce/1.16.0');

    expect(httpClient.defaults.headers['User-Agent']).toEqual('ReactionCommerce/1.16.0');
  });

  it('should not camelCase all uppercase version strings', () => {
    httpClient.defaults.headers['User-Agent'] = '';
    mollie.addVersionString('PHP/7.3.4');

    expect(httpClient.defaults.headers['User-Agent']).toEqual('PHP/7.3.4');
  });

  it('should not camelCase all uppercase version strings with whitespace', () => {
    httpClient.defaults.headers['User-Agent'] = '';
    mollie.addVersionString('PHP COOKBOOK FOR NODE USERS/7.3.4');

    expect(httpClient.defaults.headers['User-Agent']).toEqual('PHPCOOKBOOKFORNODEUSERS/7.3.4');
  });
});
