import Model from '../model';
import { IShipment } from '../types/shipment';

/**
 * The `Shipment` model
 *
 * {@link IShipment}
 */
export default class Shipment extends Model implements IShipment {
  public static resourcePrefix = 'shp_';

  public resource = 'shipment';
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

  // Access token parameters
  public testmode?: boolean;

  /**
   * Shipment constructor
   *
   * @public ✓ This constructor is part of the public API
   */
  public constructor(props?: Partial<IShipment>) {
    super();

    Object.assign(this, props);
  }
}
