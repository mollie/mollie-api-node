import { IAmount, ILinks } from '../../global';
import { OrderStatus } from '../../order';

/**
 * OrderLine Response object.
 *
 * @see
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
  amountShipped: number;
  quantityRefunded: number;
  amountRefunded: number;
  quantityCanceled: number;
  amountCanceled: number;
  shippableQuantity: number;
  refundableQuantity: number;
  unitPrice: IAmount;
  discountAmount?: IAmount;
  totalAmount: IAmount;
  vatRate: string;
  vatAmount: IAmount;
  sku?: string;
  createdAt: string;
  _links: ILinks;
  imageUrl: string;
  productUrl: string;
}

export type OrderLineType =
  | 'physical'
  | 'discount'
  | 'digital'
  | 'shipping_fee'
  | 'store_credit'
  | 'gift_card'
  | 'surcharge';
