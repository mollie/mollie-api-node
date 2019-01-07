import { AxiosInstance } from 'axios';

import Payments from './resources/payments/payments';
import PaymentsRefundsResource from './resources/payments/refunds';
import PaymentsChargebacksResource from './resources/payments/chargebacks';
import Methods from './resources/methods';
import Refunds from './resources/refunds';
import Customers from './resources/customers';
import CustomersPayments from './resources/customers/payments';
import CustomersMandates from './resources/customers/mandates';
import CustomersSubscriptions from './resources/customers/subscriptions';
import Chargebacks from './resources/chargebacks';
import OrdersShipments from './resources/orders/shipments';
import OrdersRefunds from './resources/orders/refunds';
import Orders from './resources/orders';
import OrdersLines from './resources/orders/lines';

interface ICreateMollieApi {
  httpClient: AxiosInstance;
}

/**
 * Create Mollie API
 *
 * @since 2.0.0
 */
export default function createMollieApi({ httpClient }: ICreateMollieApi) {
  return {
    // Payments API
    payments: new Payments(httpClient),
    // Methods API
    methods: new Methods(httpClient),
    // Refunds API
    payments_refunds: new PaymentsRefundsResource(httpClient),
    refunds: new Refunds(httpClient),
    // Chargebacks API
    payments_chargebacks: new PaymentsChargebacksResource(httpClient),
    chargebacks: new Chargebacks(httpClient),
    // Captures API
    payments_captures: null, // TODO: implement the Captures API

    // Customers API
    customers: new Customers(httpClient),
    customers_payments: new CustomersPayments(httpClient),
    // Mandates API
    customers_mandates: new CustomersMandates(httpClient),
    // Subscriptions API
    customers_subscriptions: new CustomersSubscriptions(httpClient),

    // Orders API
    orders: new Orders(httpClient),
    orders_refunds: new OrdersRefunds(httpClient),
    orders_lines: new OrdersLines(httpClient),
    // Shipments API
    orders_shipments: new OrdersShipments(httpClient),
  };
}
