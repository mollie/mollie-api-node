import Model from 'model';

/**
 * The `Chargeback` model
 */
export default class Chargeback extends Model {
  constructor(props) {
    super(props);

    const defaults = {
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
