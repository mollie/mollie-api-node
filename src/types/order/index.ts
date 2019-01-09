import { ApiMode, IAddress, IAmount, ILinks } from '../global';
import { IOrderLine } from './line';

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

export type OrderStatus =
  | 'created'
  | 'paid'
  | 'authorized'
  | 'canceled'
  | 'shipping'
  | 'completed'
  | 'expired';

export interface IOrderAddress extends IAddress {
  title?: string;
  givenName: string;
  familyName: string;
  email: string;
  phone?: string;
}

export enum OrderEmbed {
  payments = 'payments',
}
