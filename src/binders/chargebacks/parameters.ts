import { type ChargebackEmbed } from '../../data/chargebacks/Chargeback';
import { type PaginationParameters, type SortParameter, type ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters & SortParameter & {
  profileId?: string;
  embed?: ChargebackEmbed[];
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
