import { CommonListParameters } from '../../types/parameters';
import { PaymentChargebackEmbed } from '../../types/payment/chargeback';

export type ListParameters = CommonListParameters & {
  embed?: PaymentChargebackEmbed[];
};
