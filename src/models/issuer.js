import Base from './base';

/**
 * The `Issuer` model
 */
export default class Issuer extends Base {
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
