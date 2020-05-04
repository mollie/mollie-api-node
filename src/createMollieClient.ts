import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import fs from 'fs';
import https from 'https';
import path from 'path';

// Lib
import { version as libraryVersion } from '../package.json';
import Xor from './types/Xor';

// Resources
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

export type MollieOptions = AxiosRequestConfig & {
  /**
   * One or an array of version strings of the software you are using, such as `'RockenbergCommerce/3.1.12'`.
   */
  versionStrings?: string | string[];
} & Xor<
    {
      /**
       * The Mollie API key, starting with `'test_'` or `'live_'`.
       */
      apiKey: string;
    },
    {
      /**
       * OAuth access token, starting with `'access_''.
       */
      accessToken: string;
    }
  >;

function preprocessVersionStrings(input: string | string[] | undefined): string[] {
  if (Array.isArray(input)) {
    return input;
  }
  if (typeof input == 'string') {
    return [input];
  }
  return [];
}
function createHttpClient({ apiKey, accessToken, versionStrings, ...axiosOptions }: MollieOptions): AxiosInstance {
  axiosOptions.baseURL = 'https://api.mollie.com:443/v2/';

  if (axiosOptions.headers == undefined) {
    axiosOptions.headers = {};
  }

  axiosOptions.headers['User-Agent'] = [
    `Node/${process.version}`,
    `Mollie/${libraryVersion}`,
    ...preprocessVersionStrings(versionStrings).map(versionString => {
      //                platform/version
      const matches = /^([^\/]+)\/([^\/\s]+)$/.exec(versionString);

      if (matches === null) {
        if (-1 == versionString.indexOf('/') || versionString.indexOf('/') != versionString.lastIndexOf('/')) {
          throw new Error('Invalid version string. It needs to consist of a name and version separated by a forward slash, e.g. RockenbergCommerce/3.1.12');
        }

        throw new Error('Invalid version string. The version may not contain any whitespace.');
      }

      // Replace whitespace in platform name with camelCase (first char stays untouched).
      const platform = matches[1].replace(/([^^])(\b\w)/g, (_, boundary, character) => `${boundary}${character.toUpperCase()}`).replace(/\s+/g, '');
      const version = matches[2];

      return `${platform}/${version}`;
    }),
  ].join(' ');

  if (apiKey != undefined) {
    axiosOptions.headers['Authorization'] = `Bearer ${apiKey}`;
  } /* if (accessToken != undefined) */ else {
    axiosOptions.headers['Authorization'] = `Bearer ${accessToken}`;
    axiosOptions.headers['User-Agent'] += ' OAuth/2.0';
  }
  axiosOptions.headers['Accept-Encoding'] = 'gzip';
  axiosOptions.headers['Content-Type'] = 'application/json';

  axiosOptions.httpsAgent = new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, './cacert.pem'), 'utf8'),
  });

  return axios.create(axiosOptions);
}

/**
 * Create Mollie client.
 * @since 2.0.0
 */
export default function createMollieClient(options: MollieOptions) {
  if (!options.apiKey && !options.accessToken) {
    throw new TypeError('Missing parameter "apiKey" or "accessToken".');
  }

  const httpClient = createHttpClient(options);

  /* eslint-disable @typescript-eslint/camelcase */
  return {
    // Payments API
    payments: new PaymentsResource(httpClient),

    // Methods API
    methods: new MethodsResource(httpClient),

    // Refunds API
    payments_refunds: new PaymentsRefundsResource(httpClient),
    refunds: new RefundsResource(httpClient),

    // Chargebacks API
    payments_chargebacks: new PaymentsChargebacksResource(httpClient),
    chargebacks: new ChargebacksResource(httpClient),

    // Captures API
    payments_captures: new PaymentsCapturesResource(httpClient),

    // Customers API
    customers: new CustomersResource(httpClient),
    customers_payments: new CustomersPaymentsResource(httpClient),

    // Mandates API
    customers_mandates: new CustomersMandatesResource(httpClient),

    // Subscriptions API
    subscription: new SubscriptionsResource(httpClient),
    customers_subscriptions: new CustomersSubscriptionsResource(httpClient),

    // Orders API
    orders: new OrdersResource(httpClient),
    orders_refunds: new OrdersRefundsResource(httpClient),
    orders_lines: new OrdersLinesResource(httpClient),
    orders_payments: new OrdersPaymentsResource(httpClient),

    // Shipments API
    orders_shipments: new OrdersShipmentsResource(httpClient),

    // Permissions API
    permissions: new PermissionsResource(httpClient),

    // Organizations API
    organizations: new OrganizationsResource(httpClient),

    // Profiles API
    profiles: new ProfilesResource(httpClient),

    // Onboarding API
    onboarding: new OnboardingResource(httpClient),
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
