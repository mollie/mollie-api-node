import wireMockClient from '../../../wireMockClient';
import callAsync from '../../../callAsync';

test('createCustomerSubscription', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onPost('/customers/cst_FhQJRw4s2n/subscriptions').reply(200, {
    resource: 'subscription',
    id: 'sub_wByQa6efm6',
    mode: 'test',
    createdAt: '2018-04-24T11:41:55+00:00',
    status: 'active',
    amount: {
      value: '10.00',
      currency: 'EUR',
    },
    description: 'Order 1234',
    method: null,
    times: null,
    interval: '1 month',
    startDate: '2018-04-24',
    webhookUrl: null,
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/subscriptions/sub_wByQa6efm6',
        type: 'application/hal+json',
      },
      customer: {
        href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription',
        type: 'text/html',
      },
    },
  });

  const subscription = await callAsync(client.customers_subscriptions.create, client.customers_subscriptions, {
    customerId: 'cst_FhQJRw4s2n',
    amount: {
      value: '10.00',
      currency: 'EUR',
    },
    interval: '1 month',
    description: 'Order 1234',
  });

  expect(subscription.resource).toBe('subscription');
  expect(subscription.id).toBe('sub_wByQa6efm6');
  expect(subscription.mode).toBe('test');
  expect(subscription.createdAt).toBe('2018-04-24T11:41:55+00:00');
  expect(subscription.status).toBe('active');
  expect(subscription.amount).toEqual({ value: '10.00', currency: 'EUR' });
  expect(subscription.description).toBe('Order 1234');
  expect(subscription.method).toBeNull();
  expect(subscription.times).toBeNull();
  expect(subscription.interval).toBe('1 month');
  expect(subscription.startDate).toBe('2018-04-24');

  expect(subscription._links.self).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/subscriptions/sub_wByQa6efm6', type: 'application/hal+json' });

  expect(subscription._links.customer).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n', type: 'application/hal+json' });

  expect(subscription._links.documentation).toEqual({ href: 'https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription', type: 'text/html' });
});

test('getCustomerSubscription', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/customers/cst_FhQJRw4s2n/subscriptions/sub_wByQa6efm6').reply(200, {
    resource: 'subscription',
    id: 'sub_wByQa6efm6',
    mode: 'test',
    createdAt: '2018-04-24T11:41:55+00:00',
    status: 'active',
    amount: {
      value: '10.00',
      currency: 'EUR',
    },
    description: 'Order 1234',
    method: null,
    times: null,
    interval: '1 month',
    startDate: '2018-04-24',
    webhookUrl: null,
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/subscriptions/sub_wByQa6efm6',
        type: 'application/hal+json',
      },
      customer: {
        href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription',
        type: 'text/html',
      },
    },
  });

  const subscription = await callAsync(client.customers_subscriptions.get, client.customers_subscriptions, 'sub_wByQa6efm6', { customerId: 'cst_FhQJRw4s2n' });

  expect(subscription.resource).toBe('subscription');
  expect(subscription.id).toBe('sub_wByQa6efm6');
  expect(subscription.mode).toBe('test');
  expect(subscription.createdAt).toBe('2018-04-24T11:41:55+00:00');
  expect(subscription.status).toBe('active');
  expect(subscription.amount).toEqual({ value: '10.00', currency: 'EUR' });
  expect(subscription.description).toBe('Order 1234');
  expect(subscription.method).toBeNull();
  expect(subscription.times).toBeNull();
  expect(subscription.interval).toBe('1 month');
  expect(subscription.startDate).toBe('2018-04-24');

  expect(subscription._links.self).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/subscriptions/sub_wByQa6efm6', type: 'application/hal+json' });

  expect(subscription._links.customer).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n', type: 'application/hal+json' });

  expect(subscription._links.documentation).toEqual({ href: 'https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription', type: 'text/html' });
});

test('getCustomerSubscriptions', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/customers/cst_FhQJRw4s2n/subscriptions').reply(200, {
    _embedded: {
      subscriptions: [
        {
          resource: 'subscription',
          id: 'sub_wByQa6efm6',
          mode: 'test',
          createdAt: '2018-04-24T11:41:55+00:00',
          status: 'active',
          amount: {
            value: '10.00',
            currency: 'EUR',
          },
          description: 'Order 1234',
          method: null,
          times: null,
          interval: '1 month',
          startDate: '2018-04-24',
          webhookUrl: null,
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/subscriptions/sub_wByQa6efm6',
              type: 'application/hal+json',
            },
            customer: {
              href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n',
              type: 'application/hal+json',
            },
          },
        },
      ],
    },
    count: 1,
    _links: {
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions',
        type: 'text/html',
      },
      self: {
        href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/subscriptions?limit=50',
        type: 'application/hal+json',
      },
      previous: null,
      next: null,
    },
  });

  const subscriptions = await callAsync(client.customers_subscriptions.all, client.customers_subscriptions, { customerId: 'cst_FhQJRw4s2n' });

  expect(subscriptions.length).toBe(1);

  expect(subscriptions.links.documentation).toEqual({ href: 'https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions', type: 'text/html' });

  expect(subscriptions.links.self).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/subscriptions?limit=50', type: 'application/hal+json' });

  subscriptions.forEach(subscription => {
    expect(subscription.resource).toBe('subscription');
    expect(subscription.createdAt).toBeTruthy();
  });
});

test('cancelCustomerSubscription', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onDelete('/customers/cst_VhjQebNW5j/subscriptions/sub_DRjwaT5qHx').reply(200, {
    resource: 'subscription',
    id: 'sub_DRjwaT5qHx',
    mode: 'test',
    createdAt: '2018-04-24T11:41:55+00:00',
    status: 'canceled',
    amount: {
      value: '10.00',
      currency: 'EUR',
    },
    description: 'Order 1234',
    method: null,
    times: null,
    interval: '1 month',
    startDate: '2018-04-24',
    webhookUrl: null,
    canceledAt: '2018-04-24T12:31:32+00:00',
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/customers/cst_VhjQebNW5j/subscriptions/sub_DRjwaT5qHx',
        type: 'application/hal+json',
      },
      customer: {
        href: 'https://api.mollie.com/v2/customers/cst_VhjQebNW5j',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription',
        type: 'text/html',
      },
    },
  });

  const subscription = await callAsync(client.customers_subscriptions.cancel, client.customers_subscriptions, 'sub_DRjwaT5qHx', { customerId: 'cst_VhjQebNW5j' });

  expect(subscription.resource).toBe('subscription');
  expect(subscription.id).toBe('sub_DRjwaT5qHx');
  expect(subscription.mode).toBe('test');
  expect(subscription.status).toBe('canceled');
  expect(subscription.createdAt).toBe('2018-04-24T11:41:55+00:00');
  expect(subscription.canceledAt).toBe('2018-04-24T12:31:32+00:00');

  expect(subscription._links.self).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_VhjQebNW5j/subscriptions/sub_DRjwaT5qHx', type: 'application/hal+json' });

  expect(subscription._links.customer).toEqual({
    href: 'https://api.mollie.com/v2/customers/cst_VhjQebNW5j',
    type: 'application/hal+json',
  });

  expect(subscription._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription',
    type: 'text/html',
  });
});

test('updateCustomerSubscription', async () => {
  const { adapter, client } = wireMockClient();

  const expectedAmountValue = '12.00';
  const expectedAmountCurrency = 'EUR';
  const expectedStartDate = '2018-12-12';

  adapter.onPatch('/customers/cst_VhjQebNW5j/subscriptions/sub_DRjwaT5qHx').reply(200, {
    resource: 'subscription',
    id: 'sub_DRjwaT5qHx',
    customerId: 'cst_VhjQebNW5j',
    mode: 'live',
    createdAt: '2018-07-17T07:45:52+00:00',
    status: 'active',
    amount: {
      value: expectedAmountValue,
      currency: expectedAmountCurrency,
    },
    description: 'Mollie Recurring subscription #1',
    method: null,
    times: 42,
    interval: '15 days',
    startDate: expectedStartDate,
    webhookUrl: 'https://example.org/webhook',
    _links: {
      self: {
        href: 'http://api.mollie.test/v2/customers/cst_VhjQebNW5j/subscriptions/sub_DRjwaT5qHx',
        type: 'application/hal+json',
      },
      customer: {
        href: 'http://api.mollie.test/v2/customers/cst_VhjQebNW5j',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/subscriptions-api/update-subscription',
        type: 'text/html',
      },
    },
  });

  const subscription = await callAsync(client.customers_subscriptions.update, client.customers_subscriptions, 'sub_DRjwaT5qHx', {
    customerId: 'cst_VhjQebNW5j',
    amount: { value: expectedAmountValue, currency: expectedAmountCurrency },
    startDate: expectedStartDate,
  });

  expect(subscription.startDate).toBe(expectedStartDate);
  expect(subscription.amount).toEqual({ value: expectedAmountValue, currency: expectedAmountCurrency });
});
