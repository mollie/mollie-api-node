import { ApiMode, CardLabel, Links, Url } from '../../global';
import Model from '../../Model';
import Nullable from '../../../types/Nullable';

/**
 * Mandate Response object
 *
 * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate
 */
export interface MandateData extends Model<'mandate'> {
  mode: ApiMode;
  status: MandateStatus;
  method: MandateMethod;
  details: MandateDetails;
  mandateReference: string;
  signatureDate: string;
  createdAt: string;
  _links: MandateLinks;
}

export interface MandateLinks extends Links {
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
