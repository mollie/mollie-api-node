import Nullable from '../../../types/Nullable';
import { ApiMode, CardLabel, Links, Url } from '../../global';
import Model from '../../Model';

export interface MandateData extends Model<'mandate'> {
  /**
   * The mode used to create this mandate.
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate?path=mode#response
   */
  mode: ApiMode;
  /**
   * The status of the mandate. Please note that a status can be `pending` for mandates when the first payment is not yet finalized or when we did not received the IBAN yet.
   *
   * Possible values: `valid` `pending` `invalid`
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate?path=status#response
   */
  status: MandateStatus;
  /**
   * Payment method of the mandate.
   *
   * Possible values: `directdebit` `creditcard` `paypal`
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate?path=method#response
   */
  method: MandateMethod;
  /**
   * The mandate detail object contains different fields per payment method. See the list below.
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate?path=details#response
   */
  details: MandateDetails;
  /**
   * The mandate's custom reference, if this was provided when creating the mandate.
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate?path=mandateReference#response
   */
  mandateReference: string;
  /**
   * The signature date of the mandate in `YYYY-MM-DD` format.
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate?path=signatureDate#response
   */
  signatureDate: string;
  /**
   * The mandate's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate?path=createdAt#response
   */
  createdAt: string;
  /**
   * An object with several URL objects relevant to the mandate. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate?path=_links#response
   */
  _links: MandateLinks;
}

export interface MandateLinks extends Links {
  /**
   * The API resource URL of the customer the mandate is for.
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate?path=_links/customer#response
   */
  customer: Url;
}

export type MandateDetails = MandateDetailsCreditCard | MandateDetailsDirectDebit;

export interface MandateDetailsDirectDebit {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

export interface MandateDetailsCreditCard {
  cardHolder: string;
  cardNumber: string;
  cardLabel: Nullable<CardLabel>;
  cardFingerprint: string;
  cardExpireDate: string;
}

export enum MandateMethod {
  directdebit = 'directdebit',
  creditcard = 'creditcard',
  paypal = 'paypal',
}

export enum MandateStatus {
  valid = 'valid',
  invalid = 'invalid',
  pending = 'pending',
}
