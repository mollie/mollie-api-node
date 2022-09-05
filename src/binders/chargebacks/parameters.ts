import { ChargebackEmbed } from '../../data/chargebacks/Chargeback';
import { PaginationParameters, ThrottlingParameters } from '../../types/parameters';

export type ListParameters = PaginationParameters & {
  profileId?: string;
  embed?: ChargebackEmbed[];
};

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameters;
