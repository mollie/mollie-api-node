import wireMockClient from '../../wireMockClient';

test('createCustomer', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onPost('/customers').reply(200, {
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
  });

  const customer = await bluster(client.customers.create.bind(client.customers))({
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

test('getCustomer', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/customers/cst_FhQJRw4s2n').reply(200, {
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
  });

  const customer = await bluster(client.customers.get.bind(client.customers))('cst_FhQJRw4s2n');

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

test('listCustomers', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/customers').reply(200, {
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
  });

  const customers = await bluster(client.customers.page.bind(client.customers))();

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

test('updateCustomer', async () => {
  const { adapter, client } = wireMockClient();

  const expectedName = 'Kaas Broodje';
  const expectedEmail = 'kaas.broodje@gmail.com';

  adapter.onPatch('/customers/cst_FhQJRw4s2n').reply(200, {
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
  });

  const updatedCustomer = await bluster(client.customers.update.bind(client.customers))('cst_FhQJRw4s2n', {
    name: expectedName,
    email: expectedEmail,
  });

  expect(updatedCustomer.name).toBe(expectedName);
  expect(updatedCustomer.email).toBe(expectedEmail);
});
