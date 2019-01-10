import Model from '../model';
import { ICapture } from '../types/payment/capture';

/**
 * The `capture` model
 *
 * {@link ICapture}
 */
export default class Capture extends Model implements ICapture {
  public static resourcePrefix = 'cpt_';

  public resource = null;
  public id = null;
  public mode = null;
  public amount = null;
  public settlementAmount = null;
  public paymentId = null;
  public createdAt = null;
  public _links = {
    self: null,
    payment: null,
    shipment: null,
    settlement: null,
    documentation: null,
  };

  /**
   * Capture constructor
   *
   * @public ✓ This constructor is part of the public API
   */
  public constructor(props?: Partial<ICapture>) {
    super(props);
    Object.assign(this, props);
  }
}
