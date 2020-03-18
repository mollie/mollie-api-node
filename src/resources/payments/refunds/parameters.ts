import { RefundData, RefundEmbed } from '../../../data/refunds/data';
import { PickOptional } from '../../../types/PickOptional';
import { CommonListParameters } from '../../../types/parameters';

export interface ContextParameters {
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
