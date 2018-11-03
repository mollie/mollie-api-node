import Model from '../model';

/**
 * The `line` model
 */
export default class Line extends Model implements Mollie.FullOrderLine {
  id?: string;
  type?: Mollie.OrderLineType;
  name: string;
  quantity: number;
  unitPrice: Mollie.Amount;
  discountAmount?: Mollie.Amount;
  totalAmount: Mollie.Amount;
  vatRate: string;
  vatAmount: Mollie.Amount;
  sku: string;
  imageUrl: string;
  productUrl: string;
  _links: Mollie.Links;

  constructor(props?: Partial<Mollie.FullOrderLine>) {
    super(props);

    const defaults: Mollie.FullOrderLine = {
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
    };

    Object.assign(this, defaults, props);
  }
}
