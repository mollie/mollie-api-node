import { IAmount, IImage, ILinks } from '../global';

/**
 * Method Response object.
 *
 * @param resource - Indicates the response contains a method object. Will always contain `method` for this endpoint.
 * @param id - The unique identifier of the payment method. When used during payment creation, the payment method selection screen will be skipped.
 * @param description - The full name of the payment method, translated in the optional locale passed.
 * @param image - The URLs of images representing the payment method.
 * @param pricing - See {@link IMethodPricing}
 * @param _links - An object with several URL objects relevant to the payment method.
 *
 * @see https://docs.mollie.com/reference/v2/methods-api/get-method
 */
export interface IMethod {
  resource: string;
  id: string;
  description: string;
  image: IImage;
  _links: ILinks;
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

/**
 * Pricing set of the payment method what will be include if you add the parameter.
 *
 * @param description - The area or product-type where the pricing is applied for, translated in the optional locale passed.
 * @param fixed - The fixed price per transaction
 * @param variable - A string containing the percentage what will be charged over the payment amount besides the fixed price.
 */
export interface IMethodPricing {
  description: string;
  fixed: IAmount;
  variable: string;
}
