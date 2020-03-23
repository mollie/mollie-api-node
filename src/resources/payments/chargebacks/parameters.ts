import { ChargebackEmbed } from '../../../data/chargebacks/Chargeback';
import { CommonListParameters } from '../../../types/parameters';

interface ContextParameters {
  paymentId: string;
}

export type GetParameters = ContextParameters & {
  embed?: ChargebackEmbed[];
};

export type ListParameters = ContextParameters &
  CommonListParameters & {
    embed?: ChargebackEmbed[];
  };
