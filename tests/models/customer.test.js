import Customer from 'models/customer';

describe('customer model', () => {
  it('should instantiate with default values', () => {
    const customer = new Customer();

    expect(customer.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const customerProps = {
      resource: 'customer',
      id: 'cst_c24gk2t3G6',
      name: 'John Doe',
      email: 'john.doe@example.com',
      locale: 'en',
      metadata: {
        customerId: '12345',
      },
      recentlyUsedMethods: [],
      createdDatetime: '2017-05-06T22:01:32.480Z',
    };
    const customer = new Customer(customerProps);

    expect(customer.toPlainObject()).toMatchSnapshot();
  });
});
