import MollieModel from 'MollieModel';

/**
 * The `Customer` model
 */
export default class Customer extends MollieModel {
  constructor(props) {
    super(props);

    const defaults = {
      resource: 'customer',
      id: null,
      name: null,
      email: null,
      locale: null,
      metadata: null,
      recentlyUsedMethods: null,
      createdDatetime: null,
    };

    Object.assign(this, defaults, props);
  }
}
