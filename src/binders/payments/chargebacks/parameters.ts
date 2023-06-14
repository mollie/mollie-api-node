import { ChargebackEmbed } from '../../../data/chargebacks/Chargeback';
import { PaginationParameters, ThrottlingParameter } from '../../../types/parameters';

interface ContextParameters {
  paymentId: string;
}

export type GetParameters = ContextParameters & {
  embed?: ChargebackEmbed[];
};

export type PageParameters = ContextParameters &
  PaginationParameters & {
    embed?: ChargebackEmbed[];
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
