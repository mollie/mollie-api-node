import Model from '../model';

/**
 * The `Chargeback` model
 */
export default class Chargeback extends Model implements Mollie.ChargebackResponse {
  public resource: string;
  id: string;
  amount: Mollie.Amount;
  settlementAmount: Mollie.Amount;
  createdAt: string;
  reversedAt: string;
  paymentId: string;
  _links: Mollie.Links;

  constructor(props?: Partial<Mollie.ChargebackResponse>) {
    super(props);

    const defaults: Mollie.ChargebackResponse = {
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
