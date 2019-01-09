import Model from '../model';
import { IShipment } from '../types/shipment';

/**
 * The `shipment` model
 */
export default class Shipment extends Model implements IShipment {
  public static resourcePrefix = 'shp_';

  public resource = null;
  public id = null;
  public orderId = null;
  public createdAt = null;
  public tracking = null;
  public lines = null;
  public _links = {
    self: null,
    order: null,
    documentation: null,
  };

  /**
   * Shipment constructor
   *
   * @public ✓ This method is part of the public API
   */
  public constructor(props?: Partial<IShipment>) {
    super(props);

    Object.assign(this, props);
  }
}
