/* eslint-disable @typescript-eslint/camelcase */
import { IAmount, IUrl } from '../../global';
import { OrderStatus } from '../../order';

/**
 * OrderLine Response object.
 */
export interface IOrderLine {
  resource: string;
  id: string;
  orderId?: string;
  type: OrderLineType;
  name: string;
  status: OrderStatus;
  isCancelable: boolean;
  quantity: number;
  quantityShipped: number;
  amountShipped: IAmount;
  quantityRefunded: number;
  amountRefunded: IAmount;
  quantityCanceled: number;
  amountCanceled: IAmount;
  shippableQuantity: number;
  refundableQuantity: number;
  cancelableQuantity: number;
  unitPrice: IAmount;
  discountAmount?: IAmount;
  totalAmount: IAmount;
  vatRate: string;
  vatAmount: IAmount;
  sku?: string;
  createdAt: string;
  _links: IOrderLineLinks;
  metadata: any;
}

export interface ICreateOrderLine {
  type?: OrderLineType;
  name: string;
  quantity: number;
  unitPrice: IAmount;
  discountAmount?: IAmount;
  totalAmount: IAmount;
  vatRate: string;
  vatAmount: IAmount;
  sku?: string;
  imageUrl?: string;
  productUrl?: string;
  metadata?: any;
}

export interface IOrderLineLinks {
  productUrl: IUrl;
  imageUrl: IUrl;
}

export interface IRequestOrderLine {
  id: string;
  quantity?: number;
  amount?: IAmount;
}

export enum OrderLineType {
  physical = 'physical',
  discount = 'discount',
  digital = 'digital',
  shipping_fee = 'shipping_fee',
  store_credit = 'store_credit',
  gift_card = 'gift_card',
  surcharge = 'surcharge',
}
