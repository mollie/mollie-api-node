import { ChargebackEmbed } from '../../data/chargebacks/Chargeback';
import { CommonListParameters } from '../../types/parameters';

export type ListParameters = CommonListParameters & {
  embed?: ChargebackEmbed[];
};
