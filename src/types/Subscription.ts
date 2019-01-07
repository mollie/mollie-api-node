declare namespace Mollie {
  interface ISubscription {
    resource: string;
    id: string;
    mode: ApiMode;
    status: Subscription.Status;
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

  namespace Subscription {
    enum Status {
      pending = 'pending',
      active = 'active',
      canceled = 'canceled',
      suspended = 'suspended',
      completed = 'completed',
    }

    namespace Params {
      interface ICreate {
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

      interface IGet {
        customerId: string;

        // Access token parameters
        testmode?: boolean;
      }

      interface IUpdate extends ISubscription {
        customerId: string;

        // Access token parameters
        testmode?: boolean;
      }

      interface ICancel {
        customerId: string;

        // Access token parameters
        testmode?: boolean;
      }

      interface IList {
        customerId: string;

        from?: string;
        limit?: number;

        // Access token parameters
        profileId?: string;
        testmode?: boolean;
      }
    }

    namespace Callback {
      type Create = (error: any, subscription: ISubscription) => void;
      type Get = (error: any, subscription: ISubscription) => void;
      type List = (error: any, subscriptions: Mollie.List<ISubscription>) => void;
      type Update = (error: any, subscription: ISubscription) => void;
      type Cancel = (error: any, success: boolean) => void;
    }

    namespace Payment {
      namespace Params {
        interface IList {
          customerId: string;
          subscriptionId: string;

          from?: string;
          limit?: number;

          // Access token parameters
          profileId?: string;
          testmode?: boolean;
        }
      }

      namespace Callback {
        type List = (error: any, payments: Mollie.List<IPayment>) => void;
      }
    }
  }
}
