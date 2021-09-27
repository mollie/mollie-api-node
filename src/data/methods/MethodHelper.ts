import { MethodData, MethodImageSize } from './data';
import ApiError from '../../errors/ApiError';
import Helper from '../Helper';
import Method from './Method';

export default class MethodHelper extends Helper<MethodData, Method> {
  /**
   * The URLs of images representing the payment method.
   *
   * @since 2.0.0
   * @since 3.0.0 SVG support
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=image#response
   */
  public getImage(this: MethodData, size: MethodImageSize | '1x' | '2x' = MethodImageSize.size2x): string {
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
  }
}
