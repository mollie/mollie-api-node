export type ValidateParameters = {
  /**
   * The validationUrl you got from the ApplePayValidateMerchant event
   * https://developer.apple.com/documentation/apple_pay_on_the_web/applepayvalidatemerchantevent
   */
  validationUrl: string;
  /**
   * The domain of your web shop, that is visible in the browser’s location bar. For example pay.myshop.com.
   */
  domain: string;
};
