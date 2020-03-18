import { MandateData } from '../../../data/customers/mandates/data';
import { CommonListParameters } from '../../../types/parameters';

export interface ContextParameters {
  customerId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters &
  Pick<MandateData, 'method'> & {
    consumerName?: string;
    consumerAccount?: string;
    consumerBic?: string;
    signatureDate?: string;
    mandateReference?: string;
  };

export type ListParameters = ContextParameters & CommonListParameters;
