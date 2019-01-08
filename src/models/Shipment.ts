import Model from '../model';
import { IShipment, IShipmentTracking } from '../types/shipment';
import { IOrderLine } from '../types/orderline';
import { ILinks } from '../types/global';

/**
 * The `shipment` model
 */
export default class Shipment extends Model implements IShipment {
  resource: string;
  id: string;
  orderId: string;
  createdAt: string;
  tracking: IShipmentTracking | null;
  lines: Array<IOrderLine>;
  _links: ILinks;

  constructor(props?: Partial<IShipment>) {
    super(props);

    const defaults: IShipment = {
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
