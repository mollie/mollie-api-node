import createHttpClient from './create-http-client';
import createMollieApi from './create-mollie-api';

/**
 * Create Mollie client.
 * @param options
 * @returns {Object} available resources
 * @since 2.0.0
 */
export default function mollie(options: any = {}) {
  if (!options.apiKey) {
    throw new TypeError('Missing parameter "apiKey".');
  }

  const httpClient = createHttpClient(options);

  return createMollieApi({ httpClient });
}
