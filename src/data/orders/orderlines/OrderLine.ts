import { Amount, Url } from '../../global';
import { OrderStatus } from '../data';
import Model from '../../Model';
import Seal from '../../../types/Seal';
import commonHelpers from '../../commonHelpers';

export interface OrderLineData extends Model<'orderline'> {
  /**
   * The ID of the order the line belongs too, for example `ord_kEn1PlbGa`.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=orderId#order-line-details
   */
  orderId?: string;
  /**
   * Always `orderline`.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=type#order-line-details
   */
  type: OrderLineType;
  /**
   * A description of the order line, for example *LEGO 4440 Forest Police Station*.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=name#order-line-details
   */
  name: string;
  /**
   * Status of the order line. One of the following values:
   *
   * -   `created`
   * -   `authorized`
   * -   `paid`
   * -   `shipping`
   * -   `canceled`
   * -   `completed`
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=status#order-line-details
   */
  status: OrderStatus;
  /**
   * Whether or not the order line can be (partially) canceled.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=isCancelable#order-line-details
   */
  isCancelable: boolean;
  /**
   * The number of items in the order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=quantity#order-line-details
   */
  quantity: number;
  /**
   * The number of items that are shipped for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=quantityShipped#order-line-details
   */
  quantityShipped: number;
  /**
   * The total amount that is shipped for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=amountShipped#order-line-details
   */
  amountShipped: Amount;
  /**
   * The number of items that are refunded for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=quantityRefunded#order-line-details
   */
  quantityRefunded: number;
  /**
   * The total amount that is refunded for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=amountRefunded#order-line-details
   */
  amountRefunded: Amount;
  /**
   * The number of items that are canceled in this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=quantityCanceled#order-line-details
   */
  quantityCanceled: number;
  /**
   * The total amount that is canceled in this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=amountCanceled#order-line-details
   */
  amountCanceled: Amount;
  /**
   * The number of items that can still be shipped for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=shippableQuantity#order-line-details
   */
  shippableQuantity: number;
  /**
   * The number of items that can still be refunded for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=refundableQuantity#order-line-details
   */
  refundableQuantity: number;
  /**
   * The number of items that can still be canceled for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=cancelableQuantity#order-line-details
   */
  cancelableQuantity: number;
  /**
   * The price of a single item including VAT in the order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=unitPrice#order-line-details
   */
  unitPrice: Amount;
  /**
   * Any discounts applied to the order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=discountAmount#order-line-details
   */
  discountAmount?: Amount;
  /**
   * The total amount of the line, including VAT and discounts.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=totalAmount#order-line-details
   */
  totalAmount: Amount;
  /**
   * The VAT rate applied to the order line, for example `"21.00"` for 21%. The `vatRate` is passed as a string and not as a float to ensure the correct number of decimals are passed.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=vatRate#order-line-details
   */
  vatRate: string;
  /**
   * The amount of value-added tax on the line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=vatAmount#order-line-details
   */
  vatAmount: Amount;
  /**
   * The SKU, EAN, ISBN or UPC of the product sold.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=sku#order-line-details
   */
  sku?: string;
  /**
   * The order line's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=createdAt#order-line-details
   */
  createdAt: string;
  /**
   * An object with several URL objects relevant to the order line. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=_links#order-line-details
   */
  _links: OrderLineLinks;
  metadata: any;
}

type OrderLine = Seal<OrderLineData, typeof commonHelpers>;

export default OrderLine;

export interface OrderLineLinks {
  /**
   * A link pointing to the product page in your web shop of the product sold.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=_links/productUrl#order-line-details
   */
  productUrl: Url;
  /**
   * A link pointing to an image of the product sold.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=_links/imageUrl#order-line-details
   */
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

export function transform(input: OrderLineData): OrderLine {
  return Object.assign(Object.create(commonHelpers), input);
}
