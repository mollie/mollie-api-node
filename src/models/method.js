import Model from "model";

/**
 * The `Method` model
 */
export default class Method extends Model {
  static IDEAL = "ideal";
  static CREDITCARD = "creditcard";
  static BANCONTACT = "bancontact";
  static SOFORT = "sofort";
  static BANKTRANSFER = "banktransfer";
  static DIRECTDEBIT = "directdebit";
  static BITCOIN = "bitcoin";
  static PAYPAL = "paypal";
  static BELFIUS = "belfius";
  static PAYSAFECARD = "paysafecard";
  static PODIUMCADEAUKAART = "podiumcadeaukaart";
  static KBC = "kbc";
  static GIFTCARD = "giftcard";
  static INGHOMEPAY = "inghomepay";

  constructor(props) {
    super(props);

    const defaults = {
      resource: "method",
      id: null,
      description: null,
      image: {
        size1x: null,
        size2x: null
      }
    };

    Object.assign(this, defaults, props);
  }

  /**
   * @param size
   * @returns {string|null}
   */
  getImage(size = "2x") {
    return (
      this.image && (size === "1x" ? this.image.size1x : this.image.size2x)
    );
  }
}
