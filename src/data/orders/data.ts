import { Address, Amount, ApiMode, Links, Url } from '../global';
import { OrderLineData } from './orderlines/OrderLine';
import { PaymentData } from '../payments/data';
import { RefundData } from '../refunds/data';
import { ShipmentData } from './shipments/Shipment';
import Model from '../Model';
import Nullable from '../../types/Nullable';

/**
 * Order Response object.
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/get-order
 */
export interface OrderData extends Model<'order'> {
  mode: ApiMode;
  profileId: string;
  method: Nullable<string>;
  amount: Amount;
  amountCaptured?: Nullable<Amount>;
  amountRefunded?: Nullable<Amount>;
  status: OrderStatus;
  isCancelable: boolean;
  billingAddress: OrderAddress;
  consumerDateOfBirth?: string;
  orderNumber: string;
  shippingAddress: OrderAddress;
  locale: string;
  metadata?: any;
  redirectUrl: Nullable<string>;
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
    refunds?: Omit<RefundData, '_embedded'>[];
    shipments?: Omit<ShipmentData, '_embedded'>[];
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
  refunds = 'refunds',
  shipments = 'shipments',
}
