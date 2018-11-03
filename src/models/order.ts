import Model from '../model';

/**
 * The `order` model
 */
export default class Order extends Model implements Mollie.OrderResponse {
  resource: string;
  id: string;
  profileId: string;
  method: string | null;
  mode: Mollie.ApiMode;
  amount: Mollie.Amount;
  amountCaptured: Mollie.Amount | null;
  amountRefunded: Mollie.Amount | null;
  status: Mollie.OrderStatus;
  isCancelable: boolean;
  billingAddress: Mollie.OrderAddress;
  consumerDateOfBirth?: string;
  orderNumber: string;
  shippingAddress: Mollie.OrderAddress;
  locale: string;
  metadata: any;
  redirectUrl: string | null;
  lines: Array<Mollie.OrderLineResponse>;
  webhookUrl?: string;
  createdAt: string;
  expiresAt?: string;
  expiredAt?: string;
  paidAt?: string;
  authorizedAt?: string;
  canceledAt?: string;
  completedAt?: string;
  _links: Mollie.Links;

  constructor(props?: Partial<Mollie.ChargebackResponse>) {
    super(props);

    const defaults: Mollie.OrderResponse = {
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
