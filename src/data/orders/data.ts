import { Address, Amount, ApiMode, Links, Url } from '../global';
import { OrderLineData } from './orderlines/OrderLine';
import { PaymentData } from '../payments/data';
import Model from '../Model';

/**
 * Order Response object.
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/get-order
 */
export interface OrderData extends Model<'order'> {
  mode: ApiMode;
  profileId: string;
  method: string | null;
  amount: Amount;
  amountCaptured?: Amount | null;
  amountRefunded?: Amount | null;
  status: OrderStatus;
  isCancelable: boolean;
  billingAddress: OrderAddress;
  consumerDateOfBirth?: string;
  orderNumber: string;
  shippingAddress: OrderAddress;
  locale: string;
  metadata?: any;
  redirectUrl: string | null;
  lines: OrderLineData[];
  webhookUrl?: string;
  createdAt: string;
  expiresAt?: string;
  paidAt?: string;
  authorizedAt?: string;
  canceledAt?: string;
  completedAt?: string;
  _embedded?: {
    payments?: Omit<PaymentData, '_embedded'>[];
  };
  _links: OrderLinks;
}

export interface OrderLinks extends Links {
  checkout?: Url;
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

export interface OrderAddress extends Address {
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
