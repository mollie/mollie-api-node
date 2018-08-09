import Customer from 'models/customer';

describe('customer model', () => {
  it('should instantiate with default values', () => {
    const customer = new Customer();

    expect(customer.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const customerProps = JSON.parse(`{
        "resource": "customer",
        "id": "cst_kEn1PlbGa",
        "mode": "test",
        "name": "Customer A",
        "email": "customer@example.org",
        "locale": "nl_NL",
        "metadata": null,
        "recentlyUsedMethods": [
            "creditcard",
            "ideal"
        ],
        "createdAt": "2018-04-06T13:23:21.0Z",
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/customers/cst_kEn1PlbGa",
                "type": "application/hal+json"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/customers-api/get-customer",
                "type": "text/html"
            }
        }
    }`);
    const customer = new Customer(customerProps);

    expect(customer.toPlainObject()).toMatchSnapshot();
  });
});
