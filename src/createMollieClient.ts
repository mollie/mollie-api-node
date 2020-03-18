import path from 'path';
import fs from 'fs';
import https from 'https';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { cloneDeep } from 'lodash';

// Lib
import { version as libraryVersion } from '../package.json';

// Resources
import OrdersShipmentsResource from './resources/orders/shipments/OrdersShipmentsResource';
import OrdersRefundsResource from './resources/refunds/orders/OrdersRefundsResource';
import OrdersPaymentsResource from './resources/payments/orders/OrdersPaymentsResource';
import OrdersLinesResource from './resources/orders/orderlines/OrderLinesResource';
import OrdersResource from './resources/orders/OrdersResource';
import PaymentsResource from './resources/payments/PaymentsResource';
import RefundsResource from './resources/refunds/RefundsResource';
import PaymentsRefundsResource from './resources/payments/refunds/PaymentRefundsResource';
import PaymentsChargebacksResource from './resources/payments/chargebacks/PaymentsChargebacksResource';
import ChargebacksResource from './resources/chargebacks/ChargebacksResource';
import PaymentsCapturesResource from './resources/payments/captures/PaymentsCapturesResource';
import MethodsResource from './resources/methods/MethodsResource';
import CustomersResource from './resources/customers/CustomersResource';
import CustomersPaymentsResource from './resources/customers/payments/CustomersPaymentsResource';
import CustomersMandatesResource from './resources/customers/mandates/CustomersMandatesResource';
import CustomersSubscriptionsResource from './resources/customers/subscriptions/CustomersSubscriptionsResource';

export interface MollieOptions extends AxiosRequestConfig {
  /**
   * The Mollie API key, starting with `'test_'` or `'live_'`.
   */
  apiKey: string;
  /**
   * One or an array of version strings of the software you are using, such as `'RockenbergCommerce/3.1.12'`.
   */
  versionStrings?: string | string[];
}

function createHttpClient(options: MollieOptions): AxiosInstance {
  const axiosOptions = cloneDeep(options);

  delete axiosOptions.apiKey;
  delete axiosOptions.versionStrings;

  axiosOptions.baseURL = 'https://api.mollie.com:443/v2/';

  if (axiosOptions.headers === undefined) {
    axiosOptions.headers = {};
  }

  axiosOptions.headers['Authorization'] = `Bearer ${options.apiKey}`;
  axiosOptions.headers['Accept-Encoding'] = 'gzip';
  axiosOptions.headers['Content-Type'] = 'application/json';

  let customVersionStrings = options.versionStrings || [];

  if (!Array.isArray(customVersionStrings)) {
    customVersionStrings = [customVersionStrings] as string[];
  }

  axiosOptions.headers['User-Agent'] = [
    `Node/${process.version}`,
    `Mollie/${libraryVersion}`,
    ...(customVersionStrings as string[]).map(versionString => {
      //                platform/version
      const matches = /^([^\/]+)\/([^\/\s]+)$/.exec(versionString);

      if (matches === null) {
        if (-1 == versionString.indexOf('/') || versionString.indexOf('/') != versionString.lastIndexOf('/')) {
          throw new Error('Invalid version string. It needs to consist of a name and version separated by a forward slash, e.g. RockenbergCommerce/3.1.12');
        }

        throw new Error('Invalid version string. The version may not contain any whitespace.');
      }

      // Replace whitespace in platform name with camelCase (first char stays untouched).
      const platform = matches[1].replace(/([^^])(\b\w)/g, (match, boundary, character) => [boundary, character.toUpperCase()].join('')).replace(/\s+/g, '');
      const version = matches[2];

      return [platform, version].join('/');
    }),
  ].join(' ');

  axiosOptions.httpsAgent = new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, './cacert.pem'), 'utf8'),
  });

  return axios.create(axiosOptions);
}

export interface MollieClient {
  payments: PaymentsResource;
  methods: MethodsResource;
  payments_refunds: PaymentsRefundsResource;
  refunds: RefundsResource;
  payments_chargebacks: PaymentsChargebacksResource;
  chargebacks: ChargebacksResource;
  payments_captures: PaymentsCapturesResource;
  customers: CustomersResource;
  customers_payments: CustomersPaymentsResource;
  customers_mandates: CustomersMandatesResource;
  customers_subscriptions: CustomersSubscriptionsResource;
  orders: OrdersResource;
  orders_refunds: OrdersRefundsResource;
  orders_lines: OrdersLinesResource;
  orders_shipments: OrdersShipmentsResource;
  orders_payments: OrdersPaymentsResource;
}

/**
 * Create Mollie client.
 * @since 2.0.0
 */
export default function createMollieClient(options: MollieOptions): MollieClient {
  if (!options.apiKey) {
    throw new TypeError('Missing parameter "apiKey".');
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
    customers_subscriptions: new CustomersSubscriptionsResource(httpClient),

    // Orders API
    orders: new OrdersResource(httpClient),
    orders_refunds: new OrdersRefundsResource(httpClient),
    orders_lines: new OrdersLinesResource(httpClient),
    orders_payments: new OrdersPaymentsResource(httpClient),

    // Shipments API
    orders_shipments: new OrdersShipmentsResource(httpClient),
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
