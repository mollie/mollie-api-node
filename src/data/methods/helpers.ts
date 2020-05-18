import { MethodData, MethodImageSize } from './data';
import ApiError from '../../errors/ApiError';
import commonHelpers from '../commonHelpers';

export default {
  ...commonHelpers,
  /**
   * Method image URL
   *
   * @since 2.0.0
   * @since 3.0.0 SVG support
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
