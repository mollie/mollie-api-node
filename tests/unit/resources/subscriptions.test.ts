import wireMockClient from '../../wireMockClient';

test('listPageOfRootSubscriptions', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/subscriptions').reply(200, {
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
        href: 'https://api.mollie.com/v2/subscriptions?limit=50',
        type: 'application/hal+json',
      },
      previous: null,
      next: null,
    },
  });

  const subscriptions = await bluster(client.subscription.list.bind(client.subscription))();

  expect(subscriptions.length).toBe(1);

  expect(subscriptions[0].resource).toBe('subscription');
  expect(subscriptions[0].id).toBe('sub_wByQa6efm6');
  // No need to test all attributes here ...
});
