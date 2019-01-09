import { AxiosInstance } from 'axios';

import PaymentsResource from './resources/payments/payments';
import PaymentsRefundsResource from './resources/payments/refunds';
import PaymentsChargebacksResource from './resources/payments/chargebacks';
import MethodsResource from './resources/methods';
import RefundsResource from './resources/refunds';
import CustomersResource from './resources/customers/customers';
import CustomersPaymentsResource from './resources/customers/payments';
import CustomersMandatesResource from './resources/customers/mandates';
import CustomersSubscriptionsResource from './resources/customers/subscriptions/subscriptions';
import ChargebacksResource from './resources/chargebacks';
import OrdersShipmentsResource from './resources/orders/shipments';
import OrdersRefundsResource from './resources/orders/refunds';
import OrdersResource from './resources/orders/orders';
import OrdersLinesResource from './resources/orders/lines';
import PaymentsCapturesResource from './resources/payments/captures';

interface ICreateMollieApi {
  httpClient: AxiosInstance;
}

export interface IMollieApiClient {
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
