import Model from '../model';
import { IMethod, MethodImageSize } from '../types/method';

/**
 * The `Method` model
 *
 * {@link IMethod}
 */
export default class Method extends Model implements IMethod {
  public resource = 'method';
  public id = null;
  public description = null;
  public image = {
    size1x: null,
    size2x: null,
    svg: null,
  };
  public _links = {
    self: null,
    documentation: null,
  };

  /**
   * Method constructor
   *
   * @public ✓ This method is part of the public API
   */
  public constructor(props?: Partial<IMethod>) {
    super();

    Object.assign(this, props);
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
