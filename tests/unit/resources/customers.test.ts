import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

test('createCustomer', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('POST', '/customers', 200, {
      resource: 'customer',
      id: 'cst_FhQJRw4s2n',
      mode: 'test',
      name: 'John Doe',
      email: 'johndoe@example.org',
      locale: null,
      metadata: null,
      recentlyUsedMethods: [],
      createdAt: '2018-04-19T08:49:01+00:00',
      _links: {
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/customers-api/create-customer',
          type: 'text/html',
        },
      },
    }).twice();

    const customer = await bluster(mollieClient.customers.create.bind(mollieClient.customers))({
      name: 'John Doe',
      email: 'johndoe@example.org',
    });

    expect(customer.resource).toBe('customer');
    expect(customer.id).toBe('cst_FhQJRw4s2n');
    expect(customer.name).toBe('John Doe');
    expect(customer.email).toBe('johndoe@example.org');
    expect(customer.locale).toBeNull();
    expect(customer.metadata).toBeNull();
    expect(customer.recentlyUsedMethods).toEqual([]);
    expect(customer.createdAt).toBe('2018-04-19T08:49:01+00:00');

    expect(customer._links.documentation).toEqual({
      href: 'https://docs.mollie.com/reference/v2/customers-api/create-customer',
      type: 'text/html',
    });
  });
});

test('getCustomer', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/customers/cst_FhQJRw4s2n', 200, {
      resource: 'customer',
      id: 'cst_FhQJRw4s2n',
      mode: 'test',
      name: 'John Doe',
      email: 'johndoe@example.org',
      locale: null,
      metadata: null,
      recentlyUsedMethods: [],
      createdAt: '2018-04-19T08:49:01+00:00',
      _links: {
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/customers-api/get-customer',
          type: 'text/html',
        },
      },
    }).twice();

    const customer = await bluster(mollieClient.customers.get.bind(mollieClient.customers))('cst_FhQJRw4s2n');

    expect(customer.resource).toBe('customer');
    expect(customer.id).toBe('cst_FhQJRw4s2n');
    expect(customer.name).toBe('John Doe');
    expect(customer.email).toBe('johndoe@example.org');
    expect(customer.locale).toBeNull();
    expect(customer.metadata).toBeNull();
    expect(customer.recentlyUsedMethods).toEqual([]);
    expect(customer.createdAt).toBe('2018-04-19T08:49:01+00:00');

    expect(customer._links.documentation).toEqual({
      href: 'https://docs.mollie.com/reference/v2/customers-api/get-customer',
      type: 'text/html',
    });
  });
});

test('listCustomers', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/customers', 200, {
      _embedded: {
        customers: [
          {
            resource: 'customer',
            id: 'cst_FhQJRw4s2n',
            mode: 'test',
            name: 'John Doe',
            email: 'johndoe@example.org',
            locale: null,
            metadata: null,
            recentlyUsedMethods: [],
            createdAt: '2018-04-19T08:49:01+00:00',
          },
        ],
      },
      count: 1,
      _links: {
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/customers-api/list-customers',
          type: 'text/html',
        },
        self: {
          href: 'https://api.mollie.com/v2/customers?limit=50',
          type: 'application/hal+json',
        },
        previous: null,
        next: null,
      },
    }).twice();

    const customers = await bluster(mollieClient.customers.page.bind(mollieClient.customers))();

    expect(customers.links.documentation).toEqual({
      href: 'https://docs.mollie.com/reference/v2/customers-api/list-customers',
      type: 'text/html',
    });

    expect(customers.links.self).toEqual({
      href: 'https://api.mollie.com/v2/customers?limit=50',
      type: 'application/hal+json',
    });

    customers.forEach(customer => {
      expect(customer.resource).toBe('customer');
      expect(customer.createdAt).toBeTruthy();
    });
  });
});

test('updateCustomer', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    const expectedName = 'Kaas Broodje';
    const expectedEmail = 'kaas.broodje@gmail.com';

    networkMocker.intercept('PATCH', '/customers/cst_FhQJRw4s2n', 200, {
      resource: 'customer',
      id: 'cst_FhQJRw4s2n',
      mode: 'test',
      name: expectedName,
      email: expectedEmail,
      locale: null,
      metadata: null,
      recentlyUsedMethods: [],
      createdAt: '2018-04-19T08:49:01+00:00',
      _links: {
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/customers-api/get-customer',
          type: 'text/html',
        },
      },
    }).twice();

    const updatedCustomer = await bluster(mollieClient.customers.update.bind(mollieClient.customers))('cst_FhQJRw4s2n', {
      name: expectedName,
      email: expectedEmail,
    });

    expect(updatedCustomer.name).toBe(expectedName);
    expect(updatedCustomer.email).toBe(expectedEmail);
  });
});
