declare namespace Mollie {
  interface ISubscription {
    resource: string;
    id: string;
    mode: ApiMode;
    status: SubscriptionStatus;
    amount: IAmount;
    times: number;
    timesRemaining: number;
    interval: string;
    startDate: string;
    nextPaymentDate?: string;
    description: string;
    method: string;
    mandateId?: string;
    createdAt?: string;
    canceledAt: string;
    webhookUrl: string;
    metadata: any;
    _links: ILinks;

    // Access token parameters
    testmode?: boolean;
  }

  enum SubscriptionStatus {
    pending = 'pending',
    active = 'active',
    canceled = 'canceled',
    suspended = 'suspended',
    completed = 'completed',
  }

  interface ISubscriptionCreateParams {
    customerId: string;
    amount: IAmount;
    times?: number;
    interval: string;
    startDate?: string;
    description: string;
    method: Mandate.Method | null;
    mandateId?: string;
    webhookUrl?: string;
    metadata?: string;

    // Access token parameters
    profileId?: string;
    testmode?: boolean;
  }

  interface ISubscriptionGetParams {
    customerId: string;

    // Access token parameters
    testmode?: boolean;
  }

  interface ISubscriptionUpdateParams extends ISubscription {
    customerId: string;

    // Access token parameters
    testmode?: boolean;
  }

  interface ISubscriptionCancelParams {
    customerId: string;

    // Access token parameters
    testmode?: boolean;
  }

  interface ISubscriptionListParams {
    customerId: string;

    from?: string;
    limit?: number;

    // Access token parameters
    profileId?: string;
    testmode?: boolean;
  }

  interface ISubscriptionPaymentListParams {
    customerId: string;
    subscriptionId: string;

    from?: string;
    limit?: number;

    // Access token parameters
    testmode?: boolean;
  }

  type SubscriptionCreateCallback = (error: any, subscription: ISubscription) => void;
  type SubscriptionGetCallback = (error: any, subscription: ISubscription) => void;
  type SubscriptionListCallback = (error: any, subscriptions: List<ISubscription>) => void;
  type SubscriptionUpdateCallback = (error: any, subscription: ISubscription) => void;
  type SubscriptionCancelCallback = (error: any, success: boolean) => void;

  type SubscriptionPaymentListCallback = (error: any, payments: List<IPayment>) => void;
}
