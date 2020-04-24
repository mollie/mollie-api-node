import { CommonListParameters } from '../../../types/parameters';
import { MandateData } from '../../../data/customers/mandates/data';

interface ContextParameters {
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

export type GetParameters = ContextParameters;

export type ListParameters = ContextParameters & CommonListParameters;

export type RevokeParameters = ContextParameters;
