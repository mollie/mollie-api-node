import Model from '../model';
import { IChargeback } from '../types/chargeback';

/**
 * The `Chargeback` model
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
    settlement: null,
  };

  /**
   * Chargeback constructor
   *
   * @public ✓ This method is part of the public API
   */
  constructor(props?: Partial<IChargeback>) {
    super(props);

    Object.assign(this, props);
  }
}
