import { ChargebackEmbed } from '../../data/chargebacks/Chargeback';
import { PaginationParameters, ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters & {
  profileId?: string;
  embed?: ChargebackEmbed[];
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
