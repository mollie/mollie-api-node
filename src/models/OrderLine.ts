import Model from '../model';
import { IOrderLine } from '../types/order/line';

/**
 * The `OrderLine` model
 *
 * {@link IOrderLine}
 */
export default class OrderLine extends Model implements IOrderLine {
  public static resourcePrefix = 'odl_';

  public resource = null;
  public id = null;
  public name = null;
  public quantity = null;
  public unitPrice = null;
  public discountAmount = null;
  public totalAmount = null;
  public vatRate = null;
  public vatAmount = null;
  public sku = null;
  public imageUrl = null;
  public productUrl = null;
  public _links: {
    productUrl: null;
    imageUrl: null;
  };
  public orderId = null;
  public type = null;
  public status = null;
  public isCancelable = null;
  public quantityShipped = null;
  public amountShipped = null;
  public quantityRefunded = null;
  public amountRefunded = null;
  public quantityCanceled = null;
  public amountCanceled = null;
  public shippableQuantity = null;
  public refundableQuantity = null;
  public cancelableQuantity = null;
  public createdAt = null;
  public metadata = null;

  /**
   * OrderLine constructor
   *
   * @public ✓ This constructor is part of the public API
   */
  public constructor(props?: Partial<IOrderLine>) {
    super();

    Object.assign(this, props);
  }
}
