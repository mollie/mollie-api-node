import Subscription from 'models/subscription';

describe('subscription model', () => {
  it('should instantiate with default values', () => {
    const subscription = new Subscription();

    expect(subscription.isActive()).toBe(false);
    expect(subscription.isPending()).toBe(false);
    expect(subscription.isCancelled()).toBe(false);
    expect(subscription.isSuspended()).toBe(false);
    expect(subscription.isCompleted()).toBe(false);
    expect(subscription.getWebhookUrl()).toBeNull();
    expect(subscription.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const subscriptionProps = {
      resource: 'subscription',
      id: 'sub_rVKGtNd6s3',
      customerId: 'cst_stTC2WHAuS',
      mode: 'live',
      createdDatetime: '2017-03-01T12:23:34.0Z',
      status: 'active',
      amount: '25.00',
      times: 4,
      interval: '3 months',
      description: 'Quarterly payment',
      method: null,
      cancelledDatetime: '2017-03-21T07:36:12.0Z',
      links: {
        webhookUrl: 'https://example.org/payments/webhook',
      },
    };
    const subscription = new Subscription(subscriptionProps);

    expect(subscription.isActive()).toBe(true);
    expect(subscription.isPending()).toBe(false);
    expect(subscription.isCancelled()).toBe(true);
    expect(subscription.isSuspended()).toBe(false);
    expect(subscription.isCompleted()).toBe(false);
    expect(subscription.getWebhookUrl()).toBe(
      subscriptionProps.links.webhookUrl,
    );
    expect(subscription.toPlainObject()).toMatchSnapshot();
  });
});
