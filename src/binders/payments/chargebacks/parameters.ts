import { ChargebackEmbed } from '../../../data/chargebacks/Chargeback';
import { PaginationParameters, ThrottlingParameters } from '../../../types/parameters';

interface ContextParameters {
  paymentId: string;
}

export type GetParameters = ContextParameters & {
  embed?: ChargebackEmbed[];
};

export type ListParameters = ContextParameters &
  PaginationParameters & {
    embed?: ChargebackEmbed[];
  };

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameters;
