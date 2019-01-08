import Model from '../model';
import { IChargeback } from '../types/chargeback';
import { IAmount, ILinks } from '../types/global';

/**
 * The `Chargeback` model
 */
export default class Chargeback extends Model implements IChargeback {
  public static resourcePrefix = 'chb_';
  public resource: string;
  public id: string;
  public amount: IAmount;
  public settlementAmount: IAmount;
  public createdAt: string;
  public reversedAt: string;
  public paymentId: string;
  public _links: ILinks;

  constructor(props?: Partial<IChargeback>) {
    super(props);

    const defaults: IChargeback = {
      resource: 'chargeback',
      id: null,
      amount: null,
      settlementAmount: null,
      createdAt: null,
      reversedAt: null,
      paymentId: null,
      _links: {
        payment: null,
        settlement: null,
      },
    };

    Object.assign(this, defaults, props);
  }
}
