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
    [
      ['pending', 'isPending', true],
      ['pending', 'isCanceled', false],
      ['pending', 'isCompleted', false],
      ['pending', 'isSuspended', false],
      ['pending', 'isActive', false],

      // (Note that canceled subscriptions usually have their canceledAt set.)
      ['canceled', 'isPending', false],
      ['canceled', 'isCanceled', true],
      ['canceled', 'isCompleted', false],
      ['canceled', 'isSuspended', false],
      ['canceled', 'isActive', false],

      ['completed', 'isPending', false],
      ['completed', 'isCanceled', false],
      ['completed', 'isCompleted', true],
      ['completed', 'isSuspended', false],
      ['completed', 'isActive', false],

      ['suspended', 'isPending', false],
      ['suspended', 'isCanceled', false],
      ['suspended', 'isCompleted', false],
      ['suspended', 'isSuspended', true],
      ['suspended', 'isActive', false],

      ['active', 'isPending', false],
      ['active', 'isCanceled', false],
      ['active', 'isCompleted', false],
      ['active', 'isSuspended', false],
      ['active', 'isActive', true],
    ].map(async ([status, method, expectedResult]) => {
      const subscription = await getSubscription(status);

      expect(subscription[method as keyof Subscription]()).toBe(expectedResult);
    }),
  );
});
