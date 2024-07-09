import type NetworkClient from '../../communication/NetworkClient';
import type ApplePaySession from '../../data/applePaySession/ApplePaySession';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import { type RequestPaymentSessionParameters } from './parameters';

const pathSegments = '/wallets/applepay/sessions';

export default class ApplePayBinder {
  constructor(protected readonly networkClient: NetworkClient) {}

  /**
   * For integrating Apple Pay in your own checkout on the web, you need to [provide merchant
   * validation](https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/providing_merchant_validation). This is normally done using Apple's [Requesting Apple Pay
   * Session](https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/requesting_an_apple_pay_payment_session). The merchant validation proves (to Apple) that a validated
   * merchant is calling the Apple Pay Javascript APIs.
   *
   * To integrate Apple Pay via Mollie, you will have to call the Mollie API instead of Apple's API. The response of this API call can then be passed as-is to the completion method,
   * [completeMerchantValidation](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaysession/1778015-completemerchantvalidation).
   *
   * Before requesting an Apple Pay Payment Session, you must place the [domain validation file](http://www.mollie.com/.well-known/apple-developer-merchantid-domain-association) on your server at:
   * `https://[domain]/.well-known/apple-developer-merchantid-domain-association`. Without this file, it will not be possible to use Apple Pay on your domain.
   *
   * The guidelines for working with a payment session are:
   *
   * -   Request a new payment session object for each transaction. You can only use a merchant session object a single time.
   * -   The payment session object expires five minutes after it is created.
   * -   Never request the payment session from the browser. The request must be sent from your server.
   *
   * For the full documentation, see the official [Apple Pay JS API](https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api) documentation.
   *
   * @since 3.5.0
   * @see https://docs.mollie.com/reference/v2/wallets-api/request-apple-pay-payment-session
   */
  public requestPaymentSession(parameters: RequestPaymentSessionParameters): Promise<ApplePaySession>;
  public requestPaymentSession(parameters: RequestPaymentSessionParameters, callback: Callback<ApplePaySession>): void;
  public requestPaymentSession(parameters: RequestPaymentSessionParameters) {
    if (renege(this, this.requestPaymentSession, ...arguments)) return;
    return this.networkClient.post<ApplePaySession>(pathSegments, parameters);
  }
}
