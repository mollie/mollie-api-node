import { ChargebackEmbed } from '../../data/chargebacks/Chargeback';
import { PaginationParameters, ThrottlingParameters } from '../../types/parameters';

export type ListParameters = PaginationParameters & {
  embed?: ChargebackEmbed[];
};

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameters;
