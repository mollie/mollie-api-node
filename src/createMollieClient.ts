/* eslint-disable @typescript-eslint/camelcase */
import path from 'path';
import fs from 'fs';
import https from 'https';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { cloneDeep } from 'lodash';
import { version as libraryVersion } from '../package.json';
import PaymentsResource from './resources/payments';
import PaymentsRefundsResource from './resources/payments/refunds';
import PaymentsChargebacksResource from './resources/payments/chargebacks';
import MethodsResource from './resources/methods';
import RefundsResource from './resources/refunds';
import CustomersResource from './resources/customers';
import CustomersPaymentsResource from './resources/customers/payments';
import CustomersMandatesResource from './resources/customers/mandates';
import CustomersSubscriptionsResource from './resources/customers/subscriptions';
import ChargebacksResource from './resources/chargebacks';
import OrdersShipmentsResource from './resources/orders/shipments';
import OrdersRefundsResource from './resources/orders/refunds';
import OrdersResource from './resources/orders';
import OrdersLinesResource from './resources/orders/lines';
import PaymentsCapturesResource from './resources/payments/captures';

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

  if (undefined == axiosOptions.headers) {
    axiosOptions.headers = {};
  }
  axiosOptions.headers['Authorization'] = `Bearer ${options.apiKey}`;
  axiosOptions.headers['Accept-Encoding'] = 'gzip';
  axiosOptions.headers['Content-Type'] = 'application/json';

  let customVersionStrings = options.versionStrings;

  if (undefined == customVersionStrings) {
    customVersionStrings = [];
  } else if (false == Array.isArray(customVersionStrings)) {
    customVersionStrings = [customVersionStrings as string];
  }
  axiosOptions.headers['User-Agent'] = [
    `Node/${process.version}`,
    `Mollie/${libraryVersion}`,
    ...(customVersionStrings as string[]).map(versionString => {
      //                platform /version
      const matches = /^([^\/]+)\/([^\/\s]+)$/.exec(versionString);

      if (null === matches) {
        if (-1 == versionString.indexOf('/') || versionString.indexOf('/') != versionString.lastIndexOf('/')) {
          throw new Error('Invalid version string. It needs to consist of a name and version separated by a forward slash, e.g. RockenbergCommerce/3.1.12');
        } else {
          throw new Error('Invalid version string. The version may not contain any whitespace.');
        }
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
    // Shipments API
    orders_shipments: new OrdersShipmentsResource(httpClient),
  };
}

export { createMollieClient };

export { ApiMode, Locale, PaymentMethod, HistoricPaymentMethod, SequenceType } from './types/global';
export { MandateMethod, MandateStatus } from './types/mandate/index';
export { MethodImageSize, MethodInclude } from './types/method/index';
export { OrderEmbed, OrderStatus } from './types/order/index';
export { OrderLineType } from './types/order/line/index';
export { PaymentEmbed, PaymentStatus } from './types/payment/index';
export { PaymentChargebackEmbed } from './types/payment/chargeback/index';
export { RefundEmbed, RefundStatus } from './types/refund/index';
export { SubscriptionStatus } from './types/subscription/index';
