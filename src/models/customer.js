import Model from 'model';

/**
 * The `Customer` model
 */
export default class Customer extends Model {
  constructor(props) {
    super(props);

    const defaults = {
      resource: 'customer',
      id: null,
      mode: null,
      name: null,
      email: null,
      locale: null,
      metadata: null,
      recentlyUsedMethods: null,
      createdAt: null,
    };

    Object.assign(this, defaults, props);
  }
}
