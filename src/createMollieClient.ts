// Lib
import { version as libraryVersion } from '../package.json';
import caCertificates from './cacert.pem';
import NetworkClient from './NetworkClient';
import Options from './Options';
import buildFromEntries from './plumbing/buildFromEntries';

// Binders
import ApplePayBinder from './binders/applePay/ApplePayBinder';
import ChargebacksBinder from './binders/chargebacks/ChargebacksBinder';
import CustomersMandatesBinder from './binders/customers/mandates/CustomersMandatesBinder';
import CustomersPaymentsBinder from './binders/customers/payments/CustomersPaymentsBinder';
import CustomersBinder from './binders/customers/CustomersBinder';
import CustomersSubscriptionsBinder from './binders/customers/subscriptions/CustomersSubscriptionsBinder';
import MethodsBinder from './binders/methods/MethodsBinder';
import OnboardingBinder from './binders/onboarding/OnboardingBinder';
import OrdersLinesBinder from './binders/orders/orderlines/OrderLinesBinder';
import OrdersPaymentsBinder from './binders/payments/orders/OrdersPaymentsBinder';
import OrdersRefundsBinder from './binders/refunds/orders/OrdersRefundsBinder';
import OrdersBinder from './binders/orders/OrdersBinder';
import OrdersShipmentsBinder from './binders/orders/shipments/OrdersShipmentsBinder';
import OrganizationsBinder from './binders/organizations/OrganizationsBinder';
import PaymentsCapturesBinder from './binders/payments/captures/PaymentsCapturesBinder';
import PaymentsChargebacksBinder from './binders/payments/chargebacks/PaymentsChargebacksBinder';
import PaymentsRefundsBinder from './binders/payments/refunds/PaymentRefundsBinder';
import PaymentsBinder from './binders/payments/PaymentsBinder';
import PermissionsBinder from './binders/permissions/PermissionBinder';
import ProfilesBinder from './binders/profiles/ProfilesBinder';
import RefundsBinder from './binders/refunds/RefundsBinder';
import SubscriptionsBinder from './binders/subscriptions/SubscriptionsBinder';
import SubscriptionsPaymentsBinder from './binders/subscriptions/payments/SubscriptionsPaymentsBinder';

/**
 * Returns an object which has a property for each passed key, which share the same (passed) value.
 */
function alias<T, K extends string>(value: T, ...keys: K[]) {
  return buildFromEntries(keys.map(name => [name, value])) as { [ P in K ]: T };
}

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

  return {
    // Payments.
    payments: new PaymentsBinder(networkClient),

    // Methods.
    methods: new MethodsBinder(networkClient),

    // Refunds.
    ...alias(new PaymentsRefundsBinder(networkClient), 'paymentsRefunds', 'payments_refunds'),
    refunds: new RefundsBinder(networkClient),

    // Chargebacks.
    ...alias(new PaymentsChargebacksBinder(networkClient), 'paymentsChargebacks', 'payments_chargebacks'),
    chargebacks: new ChargebacksBinder(networkClient),

    // Captures.
    ...alias(new PaymentsCapturesBinder(networkClient), 'paymentsCaptures', 'payments_captures'),

    // Customers.
    customers: new CustomersBinder(networkClient),
    ...alias(new CustomersPaymentsBinder(networkClient), 'customersPayments', 'customers_payments'),

    // Mandates.
    ...alias(new CustomersMandatesBinder(networkClient), 'customersMandates', 'customers_mandates'),

    // Subscriptions.
    subscription: new SubscriptionsBinder(networkClient),
    ...alias(new SubscriptionsPaymentsBinder(networkClient), 'subscriptionsPayments', 'subscriptions_payments'),
    ...alias(new CustomersSubscriptionsBinder(networkClient), 'customersSubscriptions', 'customers_subscriptions'),

    // Orders.
    orders: new OrdersBinder(networkClient),
    ...alias(new OrdersRefundsBinder(networkClient), 'ordersRefunds', 'orders_refunds'),
    ...alias(new OrdersLinesBinder(networkClient), 'ordersLines', 'orders_lines'),
    ...alias(new OrdersPaymentsBinder(networkClient), 'ordersPayments', 'orders_payments'),

    // Shipments.
    ...alias(new OrdersShipmentsBinder(networkClient), 'ordersShipments', 'orders_shipments'),

    // Permissions.
    permissions: new PermissionsBinder(networkClient),

    // Organizations.
    organizations: new OrganizationsBinder(networkClient),

    // Profiles.
    profiles: new ProfilesBinder(networkClient),

    // Onboarding.
    onboarding: new OnboardingBinder(networkClient),

    // Apple Pay.
    applePay: new ApplePayBinder(networkClient),
  };
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
