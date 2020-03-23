import { CommonListParameters } from '../../types/parameters';
import { ChargebackEmbed } from '../../data/chargebacks/Chargeback';

export type ListParameters = CommonListParameters & {
  embed?: ChargebackEmbed[];
};
