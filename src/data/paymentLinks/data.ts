import { type Amount, type ApiMode, type Links, type Url } from '../global';
import type Model from '../Model';

export interface PaymentLinkData extends Model<'payment-link'> {
  /**
   * A short description of the payment link. The description is visible in the Dashboard and will be shown on the customer's bank or card statement when possible. This description will eventual been
   * used as payment description.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=description#response
   */
  description: string;
  /**
   * The mode used to create this payment link. Mode determines whether a payment link is *real* (live mode) or a *test* payment link.
   *
   * Possible values: `live` `test`
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=mode#response
   */
  mode: ApiMode;
  /**
   * The identifier referring to the profile this payment link was created on. For example, `pfl_QkEhN94Ba`.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=profileId#response
   */
  profileId: string;
  /**
   * The amount of the payment link, e.g. `{"currency":"EUR", "value":"100.00"}` for a €100.00 payment link.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=amount#response
   */
  amount: Amount;
  /**
   * The URL your customer will be redirected to after completing the payment process.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=redirectUrl#response
   */
  redirectUrl?: string;
  /**
   * The URL your customer will be redirected to after completing the payment process.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=redirectUrl#response
   */
  webhookUrl?: string;
  /**
   * The payment link's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=createdAt#response
   */
  createdAt: string;
  /**
   * The date and time the payment link became paid, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=paidAt#response
   */
  paidAt?: string;
  /**
   * The date and time the payment link last status change, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=updatedAt#response
   */
  updatedAt?: string;
  /**
   * The expiry date and time of the payment link, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=expiresAt#response
   */
  expiresAt?: string;
  _links: Links & { paymentLink: Url };
}
