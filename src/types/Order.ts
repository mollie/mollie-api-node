declare namespace Mollie {
  interface IOrder {
    resource: string;
    id: string;
    profileId: string;
    method: string | null;
    mode: ApiMode;
    amount: IAmount;
    amountCaptured: IAmount | null;
    amountRefunded: IAmount | null;
    status: Order.Status;
    isCancelable: boolean;
    billingAddress: Order.IAddress;
    consumerDateOfBirth?: string;
    orderNumber: string;
    shippingAddress: Order.IAddress;
    locale: string;
    metadata: any;
    redirectUrl: string | null;
    lines: Array<Partial<IOrderLine>>;
    webhookUrl?: string;
    createdAt: string;
    expiresAt?: string;
    expiredAt?: string;
    paidAt?: string;
    authorizedAt?: string;
    canceledAt?: string;
    completedAt?: string;
    _links: ILinks;
  }

  namespace Order {
    type Status =
      | 'created'
      | 'paid'
      | 'authorized'
      | 'canceled'
      | 'shipping'
      | 'completed'
      | 'expired';

    interface IAddress extends Mollie.IAddress {
      title?: string;
      givenName: string;
      familyName: string;
      email: string;
      phone?: string;
    }

    namespace Params {
      interface ICreate {
        amount: IAmount;
        orderNumber: string;
        lines: Array<IOrderLine>;
        billingAddress: IAddress;
        shippingAddress?: IAddress;
        consumerDateOfBirth?: string;
        redirectUrl: string;
        webhookUrl?: string;
        locale: Locale;
        method: Method;
        payment?: Partial<IPayment>;
        metadata?: any;

        // Access token parameters
        profileId?: string;
        testmode: boolean;
      }

      interface IGet {}

      interface IList {}

      interface IUpdate {}

      interface ICancel {}
    }

    namespace Callback {
      type Create = (error: any, order: IOrder) => void;
      type Get = (error: any, order: IOrder) => void;
      type List = (error: any, orders: Mollie.List<IOrder>) => void;
      type Update = (error: any, order: IOrder) => void;
      type Cancel = (error: any, order: IOrder) => void;
    }
  }
}
