import { ChargebackEmbed } from '../../data/chargebacks/Chargeback';
import { PaginationParameters } from '../../types/parameters';

export type ListParameters = PaginationParameters & {
  embed?: ChargebackEmbed[];
};
