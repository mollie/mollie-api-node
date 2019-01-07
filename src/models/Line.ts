import Model from '../model';

/**
 * The `line` model
 */
export default class Line extends Model implements Mollie.IOrderLine {
  public static resourcePrefix = 'odl_';
  id: string;
  type: Mollie.OrderLine.Type;
  name: string;
  quantity: number;
  unitPrice: Mollie.IAmount;
  discountAmount?: Mollie.IAmount;
  totalAmount: Mollie.IAmount;
  vatRate: string;
  vatAmount: Mollie.IAmount;

  imageUrl: string;
  productUrl: string;
  _links: Mollie.ILinks;
  resource: string;
  orderId?: string;
  status: Mollie.Order.Status;
  isCancelable: boolean;
  quantityShipped: number;
  amountShipped: number;
  quantityRefunded: number;
  amountRefunded: number;
  quantityCanceled: number;
  amountCanceled: number;
  shippableQuantity: number;
  refundableQuantity: number;
  sku?: string;
  createdAt: string;

  constructor(props?: Partial<Mollie.IOrderLine>) {
    super(props);

    const defaults: Mollie.IOrderLine = {
      resource: null,
      id: null,
      name: null,
      quantity: null,
      unitPrice: null,
      discountAmount: null,
      totalAmount: null,
      vatRate: null,
      vatAmount: null,
      sku: null,
      imageUrl: null,
      productUrl: null,
      _links: {
        order: null,
        settlement: null,
      },
      orderId: null,
      type: null,
      status: null,
      isCancelable: null,
      quantityShipped: null,
      amountShipped: null,
      quantityRefunded: null,
      amountRefunded: null,
      quantityCanceled: null,
      amountCanceled: null,
      shippableQuantity: null,
      refundableQuantity: null,
      createdAt: null,
    };

    Object.assign(this, defaults, props);
  }
}
