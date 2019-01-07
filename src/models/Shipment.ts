import Model from '../model';

/**
 * The `shipment` model
 */
export default class Shipment extends Model implements Mollie.IShipment {
  resource: string;
  id: string;
  orderId: string;
  createdAt: string;
  tracking: Mollie.Shipment.ITracking | null;
  lines: Array<Mollie.IOrderLine>;
  _links: Mollie.ILinks;

  constructor(props?: Partial<Mollie.IShipment>) {
    super(props);

    const defaults: Mollie.IShipment = {
      resource: null,
      id: null,
      orderId: null,
      createdAt: null,
      tracking: null,
      lines: [],
      _links: {
        self: null,
        order: null,
        documentation: null,
      },
    };

    Object.assign(this, defaults, props);
  }
}
