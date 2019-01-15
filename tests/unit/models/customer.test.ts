import Customer from '../../../src/models/Customer';
import {ApiMode, Locale, PaymentMethod} from '../../../src/types/global';

describe('customer model', () => {
  it('should instantiate with default values', () => {
    const customer = new Customer();

    expect(customer.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const customerProps = {
      resource: 'customer',
      id: 'cst_kEn1PlbGa',
      mode: ApiMode.test,
      name: 'Customer A',
      email: 'customer@example.org',
      locale: Locale.nl_NL,
      metadata: null,
      recentlyUsedMethods: [
        PaymentMethod.creditcard,
        PaymentMethod.ideal,
      ],
      createdAt: '2018-04-06T13:23:21.0Z',
      _links: {
        self: {
          href: 'https://api.mollie.com/v2/customers/cst_kEn1PlbGa',
          type: 'application/hal+json',
        },
        mandates: {
          href: 'https://api.mollie.com/v2/customers/cst_kEn1PlbGa/mandates',
          type: 'application/hal+json',
        },
        subscriptions: {
          href: 'https://api.mollie.com/v2/customers/cst_kEn1PlbGa/subscriptions',
          type: 'application/hal+json',
        },
        payments: {
          href: 'https://api.mollie.com/v2/customers/cst_kEn1PlbGa/payments',
          type: 'application/hal+json',
        },
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/customers-api/get-customer',
          type: 'text/html',
        },
      },
    };
    const customer = new Customer(customerProps);

    expect(customer.toPlainObject()).toMatchSnapshot();
  });
});
