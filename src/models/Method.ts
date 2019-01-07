import Model from '../model';

/**
 * The `Method` model
 */
export default class Method extends Model implements Mollie.IMethod {
  resource: string;
  id: string;
  description: string;
  image: Mollie.IImage;
  _links: Mollie.ILinks;

  constructor(props?: Partial<Mollie.IMethod>) {
    super(props);

    const defaults: Mollie.IMethod = {
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
   * Method image URL
   *
   * @param {Mollie.ImageSize|'1x'|'2x'} size
   *
   * @returns {string}
   *
   * @since 2.0.0
   * @since 2.2.0 SVG support
   *
   * @api ✓ This method is part of the public API
   */
  public getImage(
    size: Mollie.Method.ImageSize | '1x' | '2x' = Mollie.Method.ImageSize.size2x,
  ): string {
    switch (size) {
      case '1x':
      case Mollie.Method.ImageSize.size1x:
        return this.image[Mollie.Method.ImageSize.size1x];
      case '2x':
      case Mollie.Method.ImageSize.size2x:
        return this.image[Mollie.Method.ImageSize.size2x];
      case Mollie.Method.ImageSize.svg:
        return this.image[Mollie.Method.ImageSize.svg];
    }
  }
}
