import Model from '../model';
import { IImage, ILinks } from '../types/global';
import { IMethod, MethodImageSize } from '../types/method';

/**
 * The `Method` model
 */
export default class Method extends Model implements IMethod {
  resource: string;
  id: string;
  description: string;
  image: IImage;
  _links: ILinks;

  constructor(props?: Partial<IMethod>) {
    super(props);

    const defaults: IMethod = {
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
   * @param size
   *
   * @returns Url string
   *
   * @since 2.0.0
   * @since 2.2.0 SVG support
   *
   * @public ✓ This method is part of the public API
   */
  public getImage(size: MethodImageSize | '1x' | '2x' = MethodImageSize.size2x): string {
    switch (size) {
      case '1x':
      case MethodImageSize.size1x:
        return this.image[MethodImageSize.size1x];
      case '2x':
      case MethodImageSize.size2x:
        return this.image[MethodImageSize.size2x];
      case MethodImageSize.svg:
        return this.image[MethodImageSize.svg];
    }
  }
}
