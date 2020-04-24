import { CommonListParameters } from '../../../types/parameters';
import { PickOptional } from '../../../types/PickOptional';
import { RefundData, RefundEmbed } from '../../../data/refunds/data';

interface ContextParameters {
  paymentId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters & Pick<RefundData, 'amount'> & PickOptional<RefundData, 'description'>;

export type GetParameters = ContextParameters & {
  embed?: RefundEmbed[];
};

export type ListParameters = ContextParameters &
  CommonListParameters & {
    embed?: RefundEmbed[];
  };

export type CancelParameters = ContextParameters;
