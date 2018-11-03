import Model from '../model';

/**
 * The `capture` model
 */
export default class Capture extends Model implements Mollie.CaptureResponse {
  resource: string;
  id: string;
  mode: Mollie.ApiMode;
  amount: Mollie.Amount;
  settlementAmount: Mollie.Amount;
  paymentId: string;
  shipmentId?: string;
  settlementId?: string;
  createdAt: string;
  _links: Mollie.Links;

  constructor(props?: Partial<Mollie.ChargebackResponse>) {
    super(props);

    const defaults: Mollie.CaptureResponse = {
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
