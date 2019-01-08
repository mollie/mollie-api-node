import Model from '../model';
import { IOrderLine, OrderLineType } from '../types/orderline';
import { IAmount, ILinks } from '../types/global';
import { OrderStatus } from '../types/order';

/**
 * The `line` model
 */
export default class Line extends Model implements IOrderLine {
  public static resourcePrefix = 'odl_';
  id: string;
  type: OrderLineType;
  name: string;
  quantity: number;
  unitPrice: IAmount;
  discountAmount?: IAmount;
  totalAmount: IAmount;
  vatRate: string;
  vatAmount: IAmount;

  imageUrl: string;
  productUrl: string;
  _links: ILinks;
  resource: string;
  orderId?: string;
  status: OrderStatus;
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

  constructor(props?: Partial<IOrderLine>) {
    super(props);

    const defaults: IOrderLine = {
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
