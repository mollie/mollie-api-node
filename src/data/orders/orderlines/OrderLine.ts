import type Seal from '../../../types/Seal';
import { type Amount, type Url } from '../../global';
import type Model from '../../Model';
import { type OrderStatus } from '../data';

export interface OrderLineData extends Model<'orderline'> {
  /**
   * The ID of the order the line belongs too, for example `ord_kEn1PlbGa`.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/orderId#response
   */
  orderId?: string;
  /**
   * The type of product bought, for example, a physical or a digital product.
   *
   * Possible values: `physical` `discount` `digital` `shipping_fee` `store_credit` `gift_card` `surcharge`
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/type#response
   */
  type: OrderLineType;
  /**
   * A description of the order line, for example *LEGO 4440 Forest Police Station*.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/name#response
   */
  name: string;
  /**
   * Status of the order line.
   *
   * Possible values: `created` `authorized` `paid` `shipping` `canceled` `completed`
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/status#response
   */
  status: OrderStatus;
  /**
   * Whether or not the order line can be (partially) canceled.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/isCancelable#response
   */
  isCancelable: boolean;
  /**
   * The number of items in the order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/quantity#response
   */
  quantity: number;
  /**
   * The number of items that are shipped for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/quantityShipped#response
   */
  quantityShipped: number;
  /**
   * The total amount that is shipped for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/amountShipped#response
   */
  amountShipped: Amount;
  /**
   * The number of items that are refunded for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/quantityRefunded#response
   */
  quantityRefunded: number;
  /**
   * The total amount that is refunded for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/amountRefunded#response
   */
  amountRefunded: Amount;
  /**
   * The number of items that are canceled in this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/quantityCanceled#response
   */
  quantityCanceled: number;
  /**
   * The total amount that is canceled in this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/amountCanceled#response
   */
  amountCanceled: Amount;
  /**
   * The number of items that can still be shipped for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/shippableQuantity#response
   */
  shippableQuantity: number;
  /**
   * The number of items that can still be refunded for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/refundableQuantity#response
   */
  refundableQuantity: number;
  /**
   * The number of items that can still be canceled for this order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/cancelableQuantity#response
   */
  cancelableQuantity: number;
  /**
   * The price of a single item including VAT in the order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/unitPrice#response
   */
  unitPrice: Amount;
  /**
   * Any discounts applied to the order line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/discountAmount#response
   */
  discountAmount?: Amount;
  /**
   * The total amount of the line, including VAT and discounts.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/totalAmount#response
   */
  totalAmount: Amount;
  /**
   * The VAT rate applied to the order line, for example `"21.00"` for 21%. The `vatRate` is passed as a string and not as a float to ensure the correct number of decimals are passed.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/vatRate#response
   */
  vatRate: string;
  /**
   * The amount of value-added tax on the line.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/vatAmount#response
   */
  vatAmount: Amount;
  /**
   * The SKU, EAN, ISBN or UPC of the product sold.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/sku#response
   */
  sku?: string;
  /**
   * The order line's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/createdAt#response
   */
  createdAt: string;
  /**
   * An object with several URL objects relevant to the order line. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/_links#response
   */
  _links: OrderLineLinks;
  metadata: any;
}

type OrderLine = Seal<
  OrderLineData,
  {
    toPlainObject(): any;
  }
>;

export default OrderLine;

export interface OrderLineLinks {
  /**
   * A link pointing to the product page in your web shop of the product sold.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/_links/productUrl#response
   */
  productUrl: Url;
  /**
   * A link pointing to an image of the product sold.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines/_links/imageUrl#response
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
  return Object.assign(
    Object.create({
      toPlainObject: function toPlainObject(this: Model<any>): any {
        return Object.assign({}, this);
      },
    }),
    input,
  );
}
