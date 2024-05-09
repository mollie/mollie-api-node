// Lib
import { version as libraryVersion } from '../package.json';
import caCertificates from './cacert.pem';
import NetworkClient from './communication/NetworkClient';
import TransformingNetworkClient, { Transformers } from './communication/TransformingNetworkClient';
import type Options from './Options';

// Transformers
import { transform as transformChargeback } from './data/chargebacks/Chargeback';
import { transform as transformCustomer } from './data/customers/Customer';
import { transform as transformMandate } from './data/customers/mandates/Mandate';
import { transform as transformIssuer } from './data/issuer/IssuerModel';
import { transform as transformMethod } from './data/methods/Method';
import { transform as transformOnboarding } from './data/onboarding/Onboarding';
import { transform as transformOrder } from './data/orders/Order';
import { transform as transformShipment } from './data/orders/shipments/Shipment';
import { transform as transformOrganization } from './data/organizations/Organizations';
import { transform as transformPaymentLink } from './data/paymentLinks/PaymentLink';
import { transform as transformCapture } from './data/payments/captures/Capture';
import { transform as transformPayment } from './data/payments/Payment';
import { transform as transformPermission } from './data/permissions/Permission';
import { transform as transformProfile } from './data/profiles/Profile';
import { transform as transformRefund } from './data/refunds/Refund';
import { transform as transformSettlement } from './data/settlements/SettlementModel';
import { transform as transformSubscription } from './data/subscriptions/Subscription';
import { transform as transformTerminal } from './data/terminals/Terminal';

// Binders
import ApplePayBinder from './binders/applePay/ApplePayBinder';
import ChargebacksBinder from './binders/chargebacks/ChargebacksBinder';
import CustomersBinder from './binders/customers/CustomersBinder';
import CustomerMandatesBinder from './binders/customers/mandates/CustomerMandatesBinder';
import CustomerPaymentsBinder from './binders/customers/payments/CustomerPaymentsBinder';
import CustomerSubscriptionsBinder from './binders/customers/subscriptions/CustomerSubscriptionsBinder';
import MethodsBinder from './binders/methods/MethodsBinder';
import OnboardingBinder from './binders/onboarding/OnboardingBinder';
import OrderLinesBinder from './binders/orders/orderlines/OrderLinesBinder';
import OrdersBinder from './binders/orders/OrdersBinder';
import OrderShipmentsBinder from './binders/orders/shipments/OrderShipmentsBinder';
import OrganizationsBinder from './binders/organizations/OrganizationsBinder';
import PaymentLinksBinder from './binders/paymentLinks/PaymentLinksBinder';
import PaymentCapturesBinder from './binders/payments/captures/PaymentCapturesBinder';
import PaymentChargebacksBinder from './binders/payments/chargebacks/PaymentChargebacksBinder';
import OrderPaymentsBinder from './binders/payments/orders/OrderPaymentsBinder';
import PaymentsBinder from './binders/payments/PaymentsBinder';
import PaymentRefundsBinder from './binders/payments/refunds/PaymentRefundsBinder';
import PermissionsBinder from './binders/permissions/PermissionsBinder';
import ProfileGiftcardIssuersBinder from './binders/profiles/giftcardIssuers/ProfileGiftcardIssuersBinder';
import ProfileMethodsBinder from './binders/profiles/methods/ProfileMethodsBinder';
import ProfilesBinder from './binders/profiles/ProfilesBinder';
import ProfileVoucherIssuersBinder from './binders/profiles/voucherIssuers/ProfileVoucherIssuersBinder';
import OrderRefundsBinder from './binders/refunds/orders/OrderRefundsBinder';
import RefundsBinder from './binders/refunds/RefundsBinder';
import SettlementCapturesBinder from './binders/settlements/captures/SettlementCapturesBinder';
import SettlementChargebacksBinder from './binders/settlements/chargebacks/SettlementChargebacksBinder';
import SettlementPaymentsBinder from './binders/settlements/payments/SettlementPaymentsBinder';
import SettlementRefundsBinder from './binders/settlements/refunds/SettlementRefundsBinder';
import SettlementsBinder from './binders/settlements/SettlementsBinder';
import SubscriptionPaymentsBinder from './binders/subscriptions/payments/SubscriptionPaymentsBinder';
import SubscriptionsBinder from './binders/subscriptions/SubscriptionsBinder';
import TerminalsBinder from './binders/terminals/TerminalsBinder';

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

  const networkClient = new NetworkClient({ ...options, libraryVersion, nodeVersion: process.version, caCertificates });

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
      .add('onboarding', transformOnboarding)
      .add('payment-link', transformPaymentLink)
      .add('issuer', transformIssuer)
      .add('settlement', transformSettlement)
      .add('terminal', transformTerminal),
  );

  return {
    // Payments.
    payments: new PaymentsBinder(transformingNetworkClient),

    // Methods.
    methods: new MethodsBinder(transformingNetworkClient),

    // Refunds.
    refunds: new RefundsBinder(transformingNetworkClient),
    paymentRefunds: new PaymentRefundsBinder(transformingNetworkClient),

    // Chargebacks.
    chargebacks: new ChargebacksBinder(transformingNetworkClient),
    paymentChargebacks: new PaymentChargebacksBinder(transformingNetworkClient),

    // Captures.
    paymentCaptures: new PaymentCapturesBinder(transformingNetworkClient),

    // Customers.
    customers: new CustomersBinder(transformingNetworkClient),
    customerPayments: new CustomerPaymentsBinder(transformingNetworkClient),

    // Mandates.
    customerMandates: new CustomerMandatesBinder(transformingNetworkClient),

    // Subscriptions.
    subscription: new SubscriptionsBinder(transformingNetworkClient),
    subscriptionPayments: new SubscriptionPaymentsBinder(transformingNetworkClient),
    customerSubscriptions: new CustomerSubscriptionsBinder(transformingNetworkClient),

    // Orders.
    orders: new OrdersBinder(transformingNetworkClient),
    orderRefunds: new OrderRefundsBinder(transformingNetworkClient),
    orderLines: new OrderLinesBinder(transformingNetworkClient),
    orderPayments: new OrderPaymentsBinder(transformingNetworkClient),

    // Shipments.
    orderShipments: new OrderShipmentsBinder(transformingNetworkClient),

    // Permissions.
    permissions: new PermissionsBinder(transformingNetworkClient),

    // Organizations.
    organizations: new OrganizationsBinder(transformingNetworkClient),

    // Profiles.
    profiles: new ProfilesBinder(transformingNetworkClient),
    profileMethods: new ProfileMethodsBinder(transformingNetworkClient),
    profileGiftcardIssuers: new ProfileGiftcardIssuersBinder(transformingNetworkClient),
    profileVoucherIssuers: new ProfileVoucherIssuersBinder(transformingNetworkClient),

    // Onboarding.
    onboarding: new OnboardingBinder(transformingNetworkClient),

    // Apple Pay.
    applePay: new ApplePayBinder(networkClient),

    // Payment links.
    paymentLinks: new PaymentLinksBinder(transformingNetworkClient),

    // Settlements
    settlements: new SettlementsBinder(transformingNetworkClient),
    settlementPayments: new SettlementPaymentsBinder(transformingNetworkClient),
    settlementCaptures: new SettlementCapturesBinder(transformingNetworkClient),
    settlementRefunds: new SettlementRefundsBinder(transformingNetworkClient),
    settlementChargebacks: new SettlementChargebacksBinder(transformingNetworkClient),

    // Terminals
    terminals: new TerminalsBinder(transformingNetworkClient),
  };
}

export { createMollieClient };

export { MandateMethod, MandateStatus } from './data/customers/mandates/data';
export { ApiMode, HistoricPaymentMethod, Locale, PaymentMethod, SequenceType } from './data/global';
export { MethodImageSize, MethodInclude } from './data/methods/data';
export { OnboardingStatus } from './data/onboarding/data';
export { OrderEmbed, OrderStatus } from './data/orders/data';
export { OrderLineType } from './data/orders/orderlines/OrderLine';
export { CaptureEmbed } from './data/payments/captures/data';
export { PaymentEmbed, PaymentStatus } from './data/payments/data';
export { ProfileStatus } from './data/profiles/data';
export { RefundEmbed, RefundStatus } from './data/refunds/data';
export { SubscriptionStatus } from './data/subscriptions/data';
export { default as MollieApiError } from './errors/ApiError';
