// Lib
import { version as libraryVersion } from '../package.json';
import caCertificates from './cacert.pem';
import NetworkClient from './NetworkClient';
import Options from './Options';
import TransformingNetworkClient, { Transformers } from './TransformingNetworkClient';
import buildFromEntries from './plumbing/buildFromEntries';

// Transformers
import { transform as transformPayment } from './data/payments/Payment';
import { transform as transformMethod } from './data/methods/Method';
import { transform as transformRefund } from './data/refunds/Refund';
import { transform as transformChargeback } from './data/chargebacks/Chargeback';
import { transform as transformCapture } from './data/payments/captures/Capture';
import { transform as transformCustomer } from './data/customers/Customer';
import { transform as transformMandate } from './data/customers/mandates/Mandate';
import { transform as transformSubscription } from './data/subscription/Subscription';
import { transform as transformOrder } from './data/orders/Order';
import { transform as transformShipment } from './data/orders/shipments/Shipment';
import { transform as transformPermission } from './data/permissions/Permission';
import { transform as transformOrganization } from './data/organizations/Organizations';
import { transform as transformProfile } from './data/profiles/Profile';
import { transform as transformOnboarding } from './data/onboarding/Onboarding';

// Binders
import ApplePayBinder from './binders/applePay/ApplePayBinder';
import ChargebacksBinder from './binders/chargebacks/ChargebacksBinder';
import CustomerMandatesBinder from './binders/customers/mandates/CustomerMandatesBinder';
import CustomerPaymentsBinder from './binders/customers/payments/CustomerPaymentsBinder';
import CustomersBinder from './binders/customers/CustomersBinder';
import CustomerSubscriptionsBinder from './binders/customers/subscriptions/CustomerSubscriptionsBinder';
import MethodsBinder from './binders/methods/MethodsBinder';
import OnboardingBinder from './binders/onboarding/OnboardingBinder';
import OrderLinesBinder from './binders/orders/orderlines/OrderLinesBinder';
import OrderPaymentsBinder from './binders/payments/orders/OrderPaymentsBinder';
import OrderRefundsBinder from './binders/refunds/orders/OrderRefundsBinder';
import OrdersBinder from './binders/orders/OrdersBinder';
import OrderShipmentsBinder from './binders/orders/shipments/OrderShipmentsBinder';
import OrganizationsBinder from './binders/organizations/OrganizationsBinder';
import PaymentCapturesBinder from './binders/payments/captures/PaymentCapturesBinder';
import PaymentChargebacksBinder from './binders/payments/chargebacks/PaymentChargebacksBinder';
import PaymentRefundsBinder from './binders/payments/refunds/PaymentRefundsBinder';
import PaymentsBinder from './binders/payments/PaymentsBinder';
import PermissionsBinder from './binders/permissions/PermissionBinder';
import ProfilesBinder from './binders/profiles/ProfilesBinder';
import RefundsBinder from './binders/refunds/RefundsBinder';
import SubscriptionsBinder from './binders/subscriptions/SubscriptionsBinder';
import SubscriptionPaymentsBinder from './binders/subscriptions/payments/SubscriptionPaymentsBinder';

/**
 * Returns an object which has a property for each passed key, which share the same (passed) value.
 */
function alias<T, K extends string>(value: T, ...keys: K[]) {
  return buildFromEntries(keys.map(name => [name, value])) as { [P in K]: T };
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

  const transformingNetworkClient = new TransformingNetworkClient(
    networkClient,
    new Transformers()
      .add('payment', transformPayment)
      .add('method', transformMethod)
      .add('refund', transformRefund)
      .add('chargeback', transformChargeback)
      .add('capture', transformCapture)
      .add('customer', transformCustomer)
      .add('mandate', transformMandate)
      .add('subscription', transformSubscription)
      .add('order', transformOrder)
      .add('shipment', transformShipment)
      .add('permission', transformPermission)
      .add('organization', transformOrganization)
      .add('profile', transformProfile)
      .add('onboarding', transformOnboarding),
  );

  return {
    // Payments.
    payments: new PaymentsBinder(transformingNetworkClient),

    // Methods.
    methods: new MethodsBinder(transformingNetworkClient),

    // Refunds.
    refunds: new RefundsBinder(transformingNetworkClient),
    ...alias(new PaymentRefundsBinder(transformingNetworkClient), 'paymentRefunds', 'payments_refunds'),

    // Chargebacks.
    chargebacks: new ChargebacksBinder(transformingNetworkClient),
    ...alias(new PaymentChargebacksBinder(transformingNetworkClient), 'paymentChargebacks', 'payments_chargebacks'),

    // Captures.
    ...alias(new PaymentCapturesBinder(transformingNetworkClient), 'paymentCaptures', 'payments_captures'),

    // Customers.
    customers: new CustomersBinder(transformingNetworkClient),
    ...alias(new CustomerPaymentsBinder(transformingNetworkClient), 'customerPayments', 'customers_payments'),

    // Mandates.
    ...alias(new CustomerMandatesBinder(transformingNetworkClient), 'customerMandates', 'customers_mandates'),

    // Subscriptions.
    subscription: new SubscriptionsBinder(transformingNetworkClient),
    ...alias(new SubscriptionPaymentsBinder(transformingNetworkClient), 'subscriptionPayments', 'subscriptions_payments'),
    ...alias(new CustomerSubscriptionsBinder(transformingNetworkClient), 'customerSubscriptions', 'customers_subscriptions'),

    // Orders.
    orders: new OrdersBinder(transformingNetworkClient),
    ...alias(new OrderRefundsBinder(transformingNetworkClient), 'orderRefunds', 'orders_refunds'),
    ...alias(new OrderLinesBinder(transformingNetworkClient), 'orderLines', 'orders_lines'),
    ...alias(new OrderPaymentsBinder(transformingNetworkClient), 'orderPayments', 'orders_payments'),

    // Shipments.
    ...alias(new OrderShipmentsBinder(transformingNetworkClient), 'orderShipments', 'orders_shipments'),

    // Permissions.
    permissions: new PermissionsBinder(transformingNetworkClient),

    // Organizations.
    organizations: new OrganizationsBinder(transformingNetworkClient),

    // Profiles.
    profiles: new ProfilesBinder(transformingNetworkClient),

    // Onboarding.
    onboarding: new OnboardingBinder(transformingNetworkClient),

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
