import { Amount, Image, Links, PaymentMethod as PaymentMethodEnum } from '../global';
import Model from '../Model';

/**
 * Method Response object.
 *
 * @param resource - Indicates the response contains a method object. Will always contain `method` for this endpoint.
 * @param id - The unique identifier of the payment method. When used during payment creation, the payment method
 *             selection screen will be skipped.
 * @param description - The full name of the payment method, translated in the optional locale passed.
 * @param image - The URLs of images representing the payment method.
 * @param pricing - See {@link IMethodPricing}
 * @param _links - An object with several URL objects relevant to the payment method.
 *
 * @see https://docs.mollie.com/reference/v2/methods-api/get-method
 */
export interface MethodData extends Model<'method', PaymentMethodEnum> {
  description: string;
  image: Image;
  pricing: MethodPricing;
  _links: Links;
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
export interface MethodPricing {
  description: string;
  fixed: Amount;
  variable: string;
}
