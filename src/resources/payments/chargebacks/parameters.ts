import { CommonListParameters } from '../../../types/parameters';
import { ChargebackEmbed } from '../../../data/chargebacks/Chargeback';

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
