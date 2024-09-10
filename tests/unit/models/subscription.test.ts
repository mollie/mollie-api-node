import { Subscription } from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

function getSubscription(status) {
  return new NetworkMocker(getApiKeyClientProvider()).use(([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/customers/cst_FhQJRw4s2n/subscriptions/sub_wByQa6efm6', 200, {
      resource: 'subscription',
      id: 'sub_wByQa6efm6',
      mode: 'test',
      createdAt: '2018-04-24T11:41:55+00:00',
      status,
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
    }).twice();

    return bluster(mollieClient.customerSubscriptions.get.bind(mollieClient.customerSubscriptions))('sub_wByQa6efm6', { customerId: 'cst_FhQJRw4s2n' });
  });
}

test('subscriptionStatuses', () => {
  return Promise.all(
    ['pending', 'canceled', 'completed', 'suspended', 'active'].map(async status => {
      const subscription = await getSubscription(status);

      expect(subscription.status).toBe(status);
    }),
  );
});
