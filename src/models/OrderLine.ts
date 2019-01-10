import Model from '../model';
import { IOrderLine } from '../types/order/line';

/**
 * The `orderline` model
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
    self: null;
    documentation: null;
    order: null;
    settlement: null;
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
  public createdAt = null;

  /**
   * OrderLine constructor
   *
   * @public ✓ This method is part of the public API
   */
  constructor(props?: Partial<IOrderLine>) {
    super(props);

    Object.assign(this, props);
  }
}
