import { type IdempotencyParameter } from '../../types/parameters';

export interface RequestPaymentSessionParameters extends IdempotencyParameter {
  /**
   * The `validationUrl` you got from the [ApplePayValidateMerchant event](https://developer.apple.com/documentation/apple_pay_on_the_web/applepayvalidatemerchantevent).
   *
   * A [list of all valid host names](https://developer.apple.com/documentation/apple_pay_on_the_web/setting_up_your_server#3172427) for merchant validation is available. You should white list these
   * in your application and reject any `validationUrl` that have a host name not in the list.
   *
   * @see https://docs.mollie.com/reference/v2/wallets-api/request-apple-pay-payment-session?path=validationUrl#parameters
   */
  validationUrl: string;
  /**
   * The domain of your web shop, that is visible in the browser's location bar. For example `pay.myshop.com`.
   *
   * @see https://docs.mollie.com/reference/v2/wallets-api/request-apple-pay-payment-session?path=domain#parameters
   */
  domain: string;
}
