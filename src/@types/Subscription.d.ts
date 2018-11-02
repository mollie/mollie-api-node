declare namespace Mollie {
  interface Subscription {
    amount: Amount,
    times?: number,
    interval: string,
    startDate?: string,
    description: string,
    method: 'creditcard'|'directdebit'|null,
    mandateId?: string,
    webhookUrl?: string,
    metadata?: string,

    // Access token parameters
    profileId?: string,
    testmode?: boolean,
  }

  type SubscriptionStatus =
    |'pending'
    |'active'
    |'canceled'
    |'suspended'
    |'completed'
}
