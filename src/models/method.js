import MollieModel from 'mollie-model';

/**
 * The `Method` model
 */
export default class Method extends MollieModel {
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
  static GIFTCARD = 'giftcard';
  static INGHOMEPAY = 'inghomepay';

  constructor(props) {
    super(props);

    const defaults = {
      resource: 'method',
      id: null,
      description: null,
      amount: {
        minimum: null,
        maximum: null,
      },
      image: {
        normal: null,
        bigger: null,
      },
    };

    Object.assign(this, defaults, props);
  }

  /**
   * Get minimum amount of payment method
   * @returns {Number}
   */
  getMinimumAmount() {
    return parseFloat(
      this.amount && this.amount.minimum ? this.amount.minimum : '0',
    );
  }

  /**
   * Get maximum amount of payment method
   * @returns {Number}
   */
  getMaximumAmount() {
    return parseFloat(
      this.amount && this.amount.maximum ? this.amount.maximum : '0',
    );
  }
}
