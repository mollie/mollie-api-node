import Base from './base';

/**
 * The `Customer` model
 */
export default class Customer extends Base {
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
