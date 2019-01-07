import createHttpClient, { MollieRequestConfig } from './create-http-client';
import createMollieApi, { IMollieApiClient } from './create-mollie-api';

/**
 * Create Mollie client.
 * @since 2.0.0
 */
export default function mollie(options: MollieRequestConfig): IMollieApiClient {
  if (!options.apiKey) {
    throw new TypeError('Missing parameter "apiKey".');
  }

  const httpClient = createHttpClient(options);

  return createMollieApi({ httpClient });
}
