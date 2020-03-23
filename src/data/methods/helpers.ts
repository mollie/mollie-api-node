import { MethodData, MethodImageSize } from './data';
import commonHelpers from '../commonHelpers';
import ApiError from '../../errors/ApiError';

export default {
  ...commonHelpers,
  /**
   * Method image URL
   *
   * @param size
   *
   * @returns Url string
   *
   * @since 2.0.0
   * @since 3.0.0 SVG support
   *
   * @public ✓ This method is part of the public API
   */
  getImage: function getImage(this: MethodData, size: MethodImageSize | '1x' | '2x' = MethodImageSize.size2x): string {
    switch (size) {
      case '1x':
      case MethodImageSize.size1x:
        return this.image[MethodImageSize.size1x];
      case '2x':
      case MethodImageSize.size2x:
        return this.image[MethodImageSize.size2x];
      case MethodImageSize.svg:
        return this.image[MethodImageSize.svg];
      default:
        throw new ApiError(`Unexpected size: ${size}`);
    }
  },
};
