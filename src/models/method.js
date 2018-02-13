import MollieModel from 'mollie-model';

/**
 * The `Method` model
 */
export default class Method extends MollieModel {
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
