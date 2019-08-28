import Model from '../model';
import { IChargeback } from '../types/chargeback';

/**
 * The `Chargeback` model
 *
 * {@link IChargeback}
 */
export default class Chargeback extends Model implements IChargeback {
  public static resourcePrefix = 'chb_';

  public resource = 'chargeback';
  public id = null;
  public amount = null;
  public settlementAmount = null;
  public createdAt = null;
  public reversedAt = null;
  public paymentId = null;
  public _links = {
    self: null,
    documentation: null,
    payment: null,
  };

  /**
   * Chargeback constructor
   *
   * @public ✓ This method is part of the public API
   */
  public constructor(props?: Partial<IChargeback>) {
    super();

    Object.assign(this, props);
  }
}
