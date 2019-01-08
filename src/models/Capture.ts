import Model from '../model';
import { ICapture } from '../types/capture';
import { ApiMode, IAmount, ILinks } from '../types/global';

/**
 * The `capture` model
 */
export default class Capture extends Model implements ICapture {
  public static resourcePrefix = 'cpt_';
  public resource: string;
  public id: string;
  public mode: ApiMode;

  public amount: IAmount;
  public settlementAmount: IAmount;
  public paymentId: string;
  public shipmentId?: string;
  public settlementId?: string;
  public createdAt: string;
  public _links: ILinks;

  constructor(props?: Partial<ICapture>) {
    super(props);

    const defaults: ICapture = {
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
