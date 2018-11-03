import createHttpClient from './create-http-client';
import createMollieApi from './create-mollie-api';

// Expose models
import * as chargeback from './models/chargeback';
import * as customer from './models/customer';
import * as mandate from './models/mandate';
import * as method from './models/method';
import * as payment from './models/payment';
import * as refund from './models/refund';
import * as subscription from './models/subscription';
export { chargeback, customer, mandate, method, payment, refund, subscription };

/**
 * Create Mollie client.
 * @since 2.0.0
 */
export default function mollie(options: any = {}) {
  if (!options.apiKey) {
    throw new TypeError('Missing parameter "apiKey".');
  }

  const httpClient = createHttpClient(options);

  return createMollieApi({ httpClient });
}
