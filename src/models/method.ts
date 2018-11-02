import Model from '../model';

/**
 * The `Method` model
 */
export default class Method extends Model {
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

  /**
   * @param size
   * @returns {string|null}
   */
  getImage(size = '2x') {
    return this.image && (size === '1x' ? this.image.size1x : this.image.size2x);
  }
}
