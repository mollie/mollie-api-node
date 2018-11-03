import createHttpClient from './create-http-client';
import createMollieApi from './create-mollie-api';

// Expose models
import * as ChargebackModel from './models/chargeback';
import * as CustomerModel from './models/customer';
import * as MandateModel from './models/mandate';
import * as MethodModel from './models/method';
import * as PaymentModel from './models/payment';
import * as RefundModel from './models/refund';
import * as SubscriptionModel from './models/subscription';

/**
 * Create Mollie client.
 * @since 2.0.0
 */
export default function mollie(options: any = {}) {
  if (!options.apiKey) {
    throw new TypeError('Missing parameter "apiKey".');
  }

  const httpClient = createHttpClient(options);

  this.Models = {
    Chargeback: ChargebackModel,
    Customer: CustomerModel,
    Mandate: MandateModel,
    Method: MethodModel,
    Payment: PaymentModel,
    Refund: RefundModel,
    Subscription: SubscriptionModel,
  };

  return createMollieApi({ httpClient });
}
