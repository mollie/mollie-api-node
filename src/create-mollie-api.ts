import { AxiosInstance } from 'axios';

import Payments from './resources/payments';
import PaymentsRefunds from './resources/payments/refunds';
import PaymentsChargebacks from './resources/payments/chargebacks';
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
    payments: new Payments(httpClient),
    payments_refunds: new PaymentsRefunds(httpClient),
    methods: new Methods(httpClient),
    refunds: new Refunds(httpClient),
    customers: new Customers(httpClient),
    customers_payments: new CustomersPayments(httpClient),
    customers_mandates: new CustomersMandates(httpClient),
    customers_subscriptions: new CustomersSubscriptions(httpClient),
    chargebacks: new Chargebacks(httpClient),
    payments_chargebacks: new PaymentsChargebacks(httpClient),
    orders: new Orders(httpClient),
    orders_shipments: new OrdersShipments(httpClient),
    orders_refunds: new OrdersRefunds(httpClient),
    orders_lines: new OrdersLines(httpClient),
  };
}
