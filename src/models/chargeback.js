import MollieModel from 'mollie-model';

/**
 * The `Chargeback` model
 */
export default class Chargeback extends MollieModel {
  constructor(props) {
    super(props);

    const defaults = {
      resource: 'chargeback',
      id: null,
      payment: null,
      amount: null,
      chargebackDatetime: null,
      reversedDatetime: null,
    };

    Object.assign(this, defaults, props);
  }
}
