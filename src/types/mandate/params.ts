import { MandateMethod } from '../mandate';

export interface ICreateParams {
  customerId: string;
  method: MandateMethod;
  consumerName: string;
  consumerAccount: string;
  consumerBic?: string;
  signatureDate?: string;
  mandateReference?: string;

  // Access token parameters
  testmode?: boolean;
}

export interface IGetParams {
  customerId: string;

  // Access token parameters
  testmode?: boolean;
}

export interface IListParams {
  customerId: string;
  from?: string;
  limit?: number;

  // Access token parameters
  testmode?: boolean;
}

export interface IRevokeParams {
  customerId: string;

  // Access token parameters
  testmode?: boolean;
}
