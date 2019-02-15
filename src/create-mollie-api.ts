/* eslint-disable @typescript-eslint/camelcase */
import { AxiosInstance } from 'axios';
import { trimStart } from 'lodash';

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

interface ICreateMollieApi {
  httpClient: AxiosInstance;
}

export interface IMollieApiClient {
  addVersionString(versionString: string): void;

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
 * Create Mollie API
 *
 * @since 2.0.0
 *
 * @private
 */
export default function createMollieApi({ httpClient }: ICreateMollieApi): IMollieApiClient {
  return {
    addVersionString(versionString: string): void {
      // Validate the version string
      if (versionString.split('/').length !== 2) {
        throw new Error('Invalid version string. It needs to consist of a name and version separated by a forward slash, e.g. PHP/7.1.12');
      }
      if (/\s/.test(versionString.split('/')[1])) {
        throw new Error('Invalid version string. The version may not contain any whitespace.');
      }

      // Replace whitespace in platform name with camelCase (first char stays untouched)
      const platform = versionString
        .split('/')[0]
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (index > 0 ? letter.toUpperCase() : letter))
        .replace(/\s+/g, '');
      const version = versionString.split('/')[1];

      httpClient.defaults.headers['User-Agent'] = trimStart(`${httpClient.defaults.headers['User-Agent'] || ''} ${platform}/${version}`);
    },

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
