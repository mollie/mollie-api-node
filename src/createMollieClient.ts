// Lib
import { version as libraryVersion } from '../package.json';
import caCertificates from './cacert.pem';
import NetworkClient from './NetworkClient';
import Options from './Options';

// Resources
import ApplePaySessionResource from './resources/applePaySession/ApplePaySessionResource';
import ChargebacksResource from './resources/chargebacks/ChargebacksResource';
import CustomersMandatesResource from './resources/customers/mandates/CustomersMandatesResource';
import CustomersPaymentsResource from './resources/customers/payments/CustomersPaymentsResource';
import CustomersResource from './resources/customers/CustomersResource';
import CustomersSubscriptionsResource from './resources/customers/subscriptions/CustomersSubscriptionsResource';
import MethodsResource from './resources/methods/MethodsResource';
import OnboardingResource from './resources/onboarding/OnboardingResource';
import OrdersLinesResource from './resources/orders/orderlines/OrderLinesResource';
import OrdersPaymentsResource from './resources/payments/orders/OrdersPaymentsResource';
import OrdersRefundsResource from './resources/refunds/orders/OrdersRefundsResource';
import OrdersResource from './resources/orders/OrdersResource';
import OrdersShipmentsResource from './resources/orders/shipments/OrdersShipmentsResource';
import OrganizationsResource from './resources/organizations/OrganizationsResource';
import PaymentsCapturesResource from './resources/payments/captures/PaymentsCapturesResource';
import PaymentsChargebacksResource from './resources/payments/chargebacks/PaymentsChargebacksResource';
import PaymentsRefundsResource from './resources/payments/refunds/PaymentRefundsResource';
import PaymentsResource from './resources/payments/PaymentsResource';
import PermissionsResource from './resources/permissions/PermissionResource';
import ProfilesResource from './resources/profiles/ProfilesResource';
import RefundsResource from './resources/refunds/RefundsResource';
import SubscriptionsResource from './resources/subscriptions/SubscriptionsResource';
import SubscriptionsPaymentsResource from './resources/subscriptions/payments/SubscriptionsPaymentsResource';

/**
 * Create Mollie client.
 * @since 2.0.0
 */
export default function createMollieClient(options: Options) {
  // Attempt to catch cases where this library is integrated into a frontend app.
  if (['node', 'io.js'].includes(process?.release?.name) == false) {
    throw new Error(
      `Unexpected process release name ${process?.release?.name}. This may indicate that the Mollie API client is integrated into a website or app. This is not recommended, please see https://github.com/mollie/mollie-api-node/#a-note-on-use-outside-of-nodejs. If this is a mistake, please let us know: https://github.com/mollie/mollie-api-node/issues`,
    );
  }

  if (!options.apiKey && !options.accessToken) {
    throw new TypeError('Missing parameter "apiKey" or "accessToken".');
  }

  const networkClient = new NetworkClient(Object.assign({}, options, { libraryVersion, nodeVersion: process.version, caCertificates }));

  /* eslint-disable @typescript-eslint/camelcase */
  return {
    // Payments API
    payments: new PaymentsResource(networkClient),

    // Methods API
    methods: new MethodsResource(networkClient),

    // Refunds API
    payments_refunds: new PaymentsRefundsResource(networkClient),
    refunds: new RefundsResource(networkClient),

    // Chargebacks API
    payments_chargebacks: new PaymentsChargebacksResource(networkClient),
    chargebacks: new ChargebacksResource(networkClient),

    // Captures API
    payments_captures: new PaymentsCapturesResource(networkClient),

    // Customers API
    customers: new CustomersResource(networkClient),
    customers_payments: new CustomersPaymentsResource(networkClient),

    // Mandates API
    customers_mandates: new CustomersMandatesResource(networkClient),

    // Subscriptions API
    subscription: new SubscriptionsResource(networkClient),
    subscriptions_payments: new SubscriptionsPaymentsResource(networkClient),
    customers_subscriptions: new CustomersSubscriptionsResource(networkClient),

    // Orders API
    orders: new OrdersResource(networkClient),
    orders_refunds: new OrdersRefundsResource(networkClient),
    orders_lines: new OrdersLinesResource(networkClient),
    orders_payments: new OrdersPaymentsResource(networkClient),

    // Shipments API
    orders_shipments: new OrdersShipmentsResource(networkClient),

    // Permissions API
    permissions: new PermissionsResource(networkClient),

    // Organizations API
    organizations: new OrganizationsResource(networkClient),

    // Profiles API
    profiles: new ProfilesResource(networkClient),

    // Onboarding API
    onboarding: new OnboardingResource(networkClient),

    // ApplePay Session API
    applePaySession: new ApplePaySessionResource(networkClient),
  };
  /* eslint-enable @typescript-eslint/camelcase */
}

export { createMollieClient };

export { ApiMode, Locale, PaymentMethod, HistoricPaymentMethod, SequenceType } from './data/global';
export { MandateMethod, MandateStatus } from './data/customers/mandates/data';
export { MethodImageSize, MethodInclude } from './data/methods/data';
export { OrderEmbed, OrderStatus } from './data/orders/data';
export { OrderLineType } from './data/orders/orderlines/OrderLine';
export { PaymentEmbed, PaymentStatus } from './data/payments/data';
export { RefundEmbed, RefundStatus } from './data/refunds/data';
export { SubscriptionStatus } from './data/subscription/data';
