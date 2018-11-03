import Model from '../model';

/**
 * The `Method` model
 */
export default class Method extends Model {
  static IDEAL = 'ideal';
  static CREDITCARD = 'creditcard';
  static MISTERCASH = 'mistercash';
  static SOFORT = 'sofort';
  static BANKTRANSFER = 'banktransfer';
  static DIRECTDEBIT = 'directdebit';
  static BITCOIN = 'bitcoin';
  static PAYPAL = 'paypal';
  static BELFIUS = 'belfius';
  static PAYSAFECARD = 'paysafecard';
  static PODIUMCADEAUKAART = 'podiumcadeaukaart';
  static KBC = 'kbc';
  static INGHOMEPAY = 'inghomepay';
  static KLARNAPAYLATER = 'klarnapaylater';
  static KLARNASLICEIT = 'klarnasliceit';

  image: Mollie.Image;
  constructor(props?: Partial<Mollie.MethodResponse>) {
    super(props);

    const defaults: Mollie.MethodResponse = {
      resource: 'method',
      id: null,
      description: null,
      image: {
        size1x: null,
        size2x: null,
        svg: null,
      },
      _links: {},
    };

    Object.assign(this, defaults, props);
  }

  getImage(size = '2x') {
    return this.image && (size === '1x' ? this.image.size1x : this.image.size2x);
  }
}
