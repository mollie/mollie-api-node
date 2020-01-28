import { ApiMode, IAddress, IAmount, ILinks, IUrl } from '../global';
import { IOrderLine } from './line';
import { IPayment } from '../payment';

/**
 * Order Response object.
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/get-order
 */
export interface IOrder {
  resource: string;
  id: string;
  profileId: string;
  method: string | null;
  mode: ApiMode;
  amount: IAmount;
  amountCaptured?: IAmount | null;
  amountRefunded?: IAmount | null;
  status: OrderStatus;
  isCancelable: boolean;
  billingAddress: IOrderAddress;
  consumerDateOfBirth?: string;
  orderNumber: string;
  shippingAddress: IOrderAddress;
  locale: string;
  metadata: any;
  redirectUrl: string | null;
  lines: Partial<IOrderLine>[];
  webhookUrl?: string;
  createdAt: string;
  expiresAt?: string;
  expiredAt?: string;
  paidAt?: string;
  authorizedAt?: string;
  canceledAt?: string;
  completedAt?: string;
  _embedded?: {
    payments?: IPayment[];
  };
  _links: IOrderLinks;
}

export interface IOrderLinks extends ILinks {
  checkout?: IUrl;
}

export enum OrderStatus {
  created = 'created',
  paid = 'paid',
  authorized = 'authorized',
  canceled = 'canceled',
  shipping = 'shipping',
  completed = 'completed',
  expired = 'expired',
  pending = 'pending',
}

export interface IOrderAddress extends IAddress {
  organizationName?: string;
  title?: string;
  givenName: string;
  familyName: string;
  email: string;
  phone?: string;
}

export enum OrderEmbed {
  payments = 'payments',
}
