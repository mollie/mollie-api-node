import { Amount, Url } from '../../global';
import { OrderStatus } from '../data';
import Model from '../../Model';
import Seal from '../../../types/Seal';
import commonHelpers from '../../commonHelpers';

/**
 * OrderLine Response object.
 */
export interface OrderLineData extends Model<'orderline'> {
  orderId?: string;
  type: OrderLineType;
  name: string;
  status: OrderStatus;
  isCancelable: boolean;
  quantity: number;
  quantityShipped: number;
  amountShipped: Amount;
  quantityRefunded: number;
  amountRefunded: Amount;
  quantityCanceled: number;
  amountCanceled: Amount;
  shippableQuantity: number;
  refundableQuantity: number;
  cancelableQuantity: number;
  unitPrice: Amount;
  discountAmount?: Amount;
  totalAmount: Amount;
  vatRate: string;
  vatAmount: Amount;
  sku?: string;
  createdAt: string;
  _links: OrderLineLinks;
  metadata: any;
}

type OrderLine = Seal<OrderLineData, typeof commonHelpers>;

export default OrderLine;

export interface OrderLineLinks {
  productUrl: Url;
  imageUrl: Url;
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

export function injectPrototypes(input: OrderLineData): OrderLine {
  return Object.assign(Object.create(commonHelpers), input);
}
