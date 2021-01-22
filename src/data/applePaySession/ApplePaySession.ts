import Model from '../Model';
import Seal from '../../types/Seal';
import commonHelpers from '../commonHelpers';

/**
 * @see https://docs.mollie.com/reference/v2/permissions-api/get-permission
 */
export interface ApplePaySessionData extends Model<'applePaySession', string> {
  /**
   * The validationUrl you got from the ApplePayValidateMerchant event
   * https://developer.apple.com/documentation/apple_pay_on_the_web/applepayvalidatemerchantevent
   */
  validationUrl: string;
  /**
   * The domain of your web shop, that is visible in the browser’s location bar. For example pay.myshop.com.
   */
  domain: string;
}

type ApplePaySession = Seal<ApplePaySessionData, typeof commonHelpers>;

export default ApplePaySession;

export function injectPrototypes(input: ApplePaySessionData): ApplePaySession {
  return Object.assign(Object.create(commonHelpers), input);
}
