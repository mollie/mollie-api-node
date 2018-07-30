import Payments from './resources/payments';
import PaymentsRefunds from './resources/payments/refunds';
import Methods from './resources/methods';
import Refunds from './resources/refunds';
import Customers from './resources/customers';
import CustomersPayments from './resources/customers/payments';
import CustomersMandates from './resources/customers/mandates';
import CustomersSubscriptions from './resources/customers/subscriptions';
import Chargebacks from './resources/chargebacks';

/**
 * Create Mollie API
 * @param {Object} httpClient
 * @returns {Object} available resources
 * @since 2.0.0
 */
export default function createMollieApi({ httpClient }) {
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
  };
}
