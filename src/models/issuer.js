import MollieModel from 'mollie-model';

/**
 * The `Issuer` model
 */
export default class Issuer extends MollieModel {
  constructor(props) {
    super(props);

    const defaults = {
      resource: 'issuer',
      id: null,
      name: null,
      method: null,
    };

    Object.assign(this, defaults, props);
  }
}
