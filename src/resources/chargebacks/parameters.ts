import { CommonListParameters } from '../../types/parameters';
import { PaymentChargebackEmbed } from '../../data/chargebacks/Chargeback';

export type ListParameters = CommonListParameters & {
  embed?: PaymentChargebackEmbed[];
};
