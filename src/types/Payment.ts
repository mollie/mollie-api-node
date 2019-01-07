declare namespace Mollie {
  interface IPayment {
    resource: string;
    id: string;
    mode: ApiMode;
    createdAt: string;
    status: Payment.Status;
    isCancelable: boolean;
    authorizedAt?: string;
    paidAt?: string;
    canceledAt?: string;
    expiresAt: string;
    expiredAt?: string;
    failedAt?: string;
    amount: IAmount;
    amountRefunded?: IAmount;
    amountRemaining?: IAmount;
    amountCaptured?: IAmount;
    description: string;
    redirectUrl: string | null;
    webhookUrl?: string;
    method: Method;
    metadata: any;
    locale: Locale;
    countryCode?: string;
    profileId: string;
    settlementAmount?: IAmount;
    settlementId?: string;
    customerId?: string;
    sequenceType: string;
    mandateId?: string;
    subscriptionId?: string;
    orderId?: string;
    details?: any;
    applicationFee?: {
      amount: IAmount;
      description: string;
    };
    _links: ILinks;
  }

  namespace Payment {
    enum Status {
      open = 'open',
      canceled = 'canceled',
      pending = 'pending',
      authorized = 'authorized',
      expired = 'expired',
      failed = 'failed',
      paid = 'paid',
    }

    type Include = 'details.qrCode';

    enum Embed {
      refunds = 'refunds',
      chargebacks = 'chargebacks',
    }

    namespace Params {
      interface ICreate {
        amount: IAmount;
        description: string;
        redirectUrl?: string;
        webhookUrl?: string;
        locale?: Locale;
        method?: Method;
        metadata?: any;
        sequenceType?: string;
        customerId?: string;
        mandateId?: string;
        billingEmail?: string;
        billingAddress?: IAddress;
        shippingAddress?: IAddress;
        issuer: GiftcardIssuer | IdealIssuer | KbcIssuer;
        dueDate?: string;
        customerReference?: string;
        consumerName?: string;
        consumerAccount?: string;
        details?: any;

        // Access token parameters
        profileId?: string;
        testmode?: boolean;
        applicationFee?: IAmount;
      }

      interface IGet {
        includes?: Include;
        embed?: Array<Embed>; // TODO: add support for embeds

        // Access token parameters
        testmode?: boolean;
      }

      interface IList {}

      interface IUpdate extends Partial<IPayment> {}

      interface ICancel {
        // Access token parameters
        testmode?: boolean;
      }
    }

    namespace Callback {
      type Create = (err: any, payment: IPayment) => void;
      type Get = (err: any, payment: IPayment) => void;
      type List = (err: any, payments: Mollie.List<IPayment>) => void;
      type Update = (err: any, payment: IPayment) => void;
      type Cancel = (err: any, payment: IPayment) => void;
    }
  }
}
