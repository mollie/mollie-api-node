import Model from '../model';

/**
 * The `Chargeback` model
 */
export default class Chargeback extends Model implements Mollie.IChargeback {
  public static resourcePrefix = 'chb_';
  public resource: string;
  public id: string;
  public amount: Mollie.IAmount;
  public settlementAmount: Mollie.IAmount;
  public createdAt: string;
  public reversedAt: string;
  public paymentId: string;
  public _links: Mollie.ILinks;

  constructor(props?: Partial<Mollie.IChargeback>) {
    super(props);

    const defaults: Mollie.IChargeback = {
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
