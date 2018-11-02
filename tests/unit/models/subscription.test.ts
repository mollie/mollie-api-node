import Subscription from '../../../src/models/subscription';

describe('subscription model', () => {
  it('should instantiate with default values', () => {
    const subscription = new Subscription();

    expect(subscription.isActive()).toBe(false);
    expect(subscription.isPending()).toBe(false);
    expect(subscription.isCanceled()).toBe(false);
    expect(subscription.isSuspended()).toBe(false);
    expect(subscription.isCompleted()).toBe(false);
    expect(subscription.getWebhookUrl()).toBeNull();
    expect(subscription.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const subscriptionProps = JSON.parse(`{
        "resource": "subscription",
        "id": "sub_rVKGtNd6s3",
        "mode": "live",
        "createdAt": "2016-06-01T12:23:34+00:00",
        "status": "active",
        "amount": {
            "value": "25.00",
            "currency": "EUR"
        },
        "times": 4,
        "interval": "3 months",
        "description": "Quarterly payment",
        "method": null,
        "webhookUrl": "https://webshop.example.org/payments/webhook",
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3",
                "type": "application/hal+json"
            },
            "customer": {
                "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS",
                "type": "application/hal+json"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription",
                "type": "text/html"
            }
        }
    }`);
    const subscription = new Subscription(subscriptionProps);

    expect(subscription.isActive()).toBe(true);
    expect(subscription.isPending()).toBe(false);
    expect(subscription.isCanceled()).toBe(false);
    expect(subscription.isSuspended()).toBe(false);
    expect(subscription.isCompleted()).toBe(false);
    expect(subscription.getWebhookUrl()).toBe(subscriptionProps.webhookUrl);
    expect(subscription.toPlainObject()).toMatchSnapshot();
  });
});
