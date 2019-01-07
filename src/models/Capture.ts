import Model from '../model';

/**
 * The `capture` model
 */
export default class Capture extends Model implements Mollie.ICapture {
  public static resourcePrefix = 'cpt_';
  public resource: string;
  public id: string;
  public mode: Mollie.ApiMode;

  public amount: Mollie.IAmount;
  public settlementAmount: Mollie.IAmount;
  public paymentId: string;
  public shipmentId?: string;
  public settlementId?: string;
  public createdAt: string;
  public _links: Mollie.ILinks;

  constructor(props?: Partial<Mollie.ICapture>) {
    super(props);

    const defaults: Mollie.ICapture = {
      resource: null,
      id: null,
      mode: null,
      amount: null,
      settlementAmount: null,
      paymentId: null,
      createdAt: null,
      _links: {
        self: null,
        payment: null,
        shipment: null,
        settlement: null,
        documentation: null,
      },
    };

    Object.assign(this, defaults, props);
  }
}
