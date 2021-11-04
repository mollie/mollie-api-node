import { RefundData, RefundEmbed } from '../../../data/refunds/data';
import { CommonListParameters } from '../../../types/parameters';
import PickOptional from '../../../types/PickOptional';

interface ContextParameters {
  paymentId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters & Pick<RefundData, 'amount' | 'metadata'> & PickOptional<RefundData, 'description'>;

export type GetParameters = ContextParameters & {
  embed?: RefundEmbed[];
};

export type ListParameters = ContextParameters &
  CommonListParameters & {
    embed?: RefundEmbed[];
  };

export type CancelParameters = ContextParameters;
