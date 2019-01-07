import Model from '../model';

/**
 * The `order` model
 */
export default class Order extends Model implements Mollie.IOrder {
  public static resourcePrefix = 'ord_';
  resource: string;
  id: string;
  profileId: string;
  method: string | null;
  mode: Mollie.ApiMode;
  amount: Mollie.IAmount;
  amountCaptured: Mollie.IAmount | null;
  amountRefunded: Mollie.IAmount | null;
  status: Mollie.Order.Status;
  isCancelable: boolean;
  billingAddress: Mollie.Order.IAddress;
  consumerDateOfBirth?: string;
  orderNumber: string;
  shippingAddress: Mollie.Order.IAddress;
  locale: string;
  metadata: any;
  redirectUrl: string | null;
  lines: Array<Mollie.IOrderLine>;
  webhookUrl?: string;
  createdAt: string;
  expiresAt?: string;
  expiredAt?: string;
  paidAt?: string;
  authorizedAt?: string;
  canceledAt?: string;
  completedAt?: string;
  _links: Mollie.ILinks;

  constructor(props?: Partial<Mollie.IOrder>) {
    super(props);

    const defaults: Mollie.IOrder = {
      resource: 'order',
      id: null,
      amount: null,
      profileId: null,
      createdAt: null,
      method: null,
      mode: null,
      amountCaptured: null,
      amountRefunded: null,
      status: null,
      isCancelable: null,
      billingAddress: null,
      orderNumber: null,
      shippingAddress: null,
      locale: null,
      metadata: null,
      redirectUrl: null,
      lines: null,
      _links: {
        payment: null,
        settlement: null,
      },
    };

    Object.assign(this, defaults, props);
  }
}
