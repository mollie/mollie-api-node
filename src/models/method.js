import Model from "model";

/**
 * The `Method` model
 */
export default class Method extends Model {
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
