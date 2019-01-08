import { ApiMode, CardLabel, ILinks } from '../global';

export interface IMandate {
  resource: string;
  id: string;
  mode: ApiMode;
  status: MandateStatus;
  method: MandateMethod;
  details: IMandateDetails;
  mandateReference: string;
  signatureDate: string;
  createdAt: string;
  _links: ILinks;

  // Access token parameters
  testmode?: boolean;
}

export type IMandateDetails = IMandateDetailsCreditCard | IMandateDetailsDirectDebit;

export interface IMandateDetailsDirectDebit {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

export interface IMandateDetailsCreditCard {
  cardHolder: string;
  cardNumber: string;
  cardLabel: CardLabel;
  cardFingerprint: string;
  cardExpireDate: string;
}

export enum MandateMethod {
  directdebit = 'directdebit',
  creditcard = 'creditcard',
}

export enum MandateStatus {
  valid = 'valid',
  invalid = 'invalid',
  pending = 'pending',
}
