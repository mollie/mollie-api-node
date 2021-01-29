import { Amount, FeeRegion, Links, PaymentMethod as PaymentMethodEnum } from '../global';
import Model from '../Model';
import Nullable from '../../types/Nullable';

export interface MethodData extends Model<'method', PaymentMethodEnum> {
  /**
   * The full name of the payment method, translated in the optional locale passed.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=description#response
   */
  description: string;
  /**
   * An object containing `value` and `currency`. It represents the minimum payment amount required to use this payment method.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=minimumAmount#response
   */
  minimumAmount: Amount;
  /**
   * An object containing `value` and `currency`. It represents the maximum payment amount allowed when using this payment method.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=maximumAmount#response
   */
  maximumAmount: Nullable<Amount>;
  /**
   * The URLs of images representing the payment method.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=image#response
   */
  image: Image;
  /**
   * Pricing set of the payment method what will be include if you add the parameter.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=pricing#response
   */
  pricing: MethodPricing;
  /**
   * An object with several URL objects relevant to the payment method. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=_links#response
   */
  _links: Links;
}

export interface Image {
  /**
   * The URL for a payment method icon of 32x24 pixels.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=image/size1x#response
   */
  size1x: string;
  /**
   * The URL for a payment method icon of 64x48 pixels.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=image/size2x#response
   */
  size2x: string;
  /**
   * The URL for a payment method icon in vector format. Usage of this format is preferred since it can scale to any desired size.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=image/svg#response
   */
  svg: string;
}

export enum MethodImageSize {
  size1x = 'size1x',
  size2x = 'size2x',
  svg = 'svg',
}

export enum MethodInclude {
  issuers = 'issuers',
  pricing = 'pricing',
}

export interface MethodPricing {
  description: string;
  fixed: Amount;
  variable: string;
  feeRegion: FeeRegion;
}
