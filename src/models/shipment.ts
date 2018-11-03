import Model from '../model';

/**
 * The `shipment` model
 */
export default class Shipment extends Model implements Mollie.ShipmentResponse {
  resource: string;
  id: string;
  orderId: string;
  createdAt: string;
  tracking: Mollie.Tracking | null;
  lines: Array<Mollie.FullOrderLine>;
  _links: Mollie.Links;

  constructor(props?: Partial<Mollie.ShipmentResponse>) {
    super(props);

    const defaults: Mollie.ShipmentResponse = {
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
