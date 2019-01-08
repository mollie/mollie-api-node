import Model from '../model';
import { IOrder, IOrderAddress, OrderStatus } from '../types/order';
import { IOrderLine } from '../types/orderline';
import { ApiMode, IAmount, ILinks } from '../types/global';

/**
 * The `order` model
 */
export default class Order extends Model implements IOrder {
  public static resourcePrefix = 'ord_';
  resource: string;
  id: string;
  profileId: string;
  method: string | null;
  mode: ApiMode;
  amount: IAmount;
  amountCaptured: IAmount | null;
  amountRefunded: IAmount | null;
  status: OrderStatus;
  isCancelable: boolean;
  billingAddress: IOrderAddress;
  consumerDateOfBirth?: string;
  orderNumber: string;
  shippingAddress: IOrderAddress;
  locale: string;
  metadata: any;
  redirectUrl: string | null;
  lines: Array<IOrderLine>;
  webhookUrl?: string;
  createdAt: string;
  expiresAt?: string;
  expiredAt?: string;
  paidAt?: string;
  authorizedAt?: string;
  canceledAt?: string;
  completedAt?: string;
  _links: ILinks;

  constructor(props?: Partial<IOrder>) {
    super(props);

    const defaults: IOrder = {
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
