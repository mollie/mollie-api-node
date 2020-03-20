import { SubscriptionData } from '../../../data/subscription/data';
import { PickOptional } from '../../../types/PickOptional';
import { CommonListParameters } from '../../../types/parameters';

interface ContextParameters {
  customerId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters &
  Pick<SubscriptionData, 'amount' | 'interval' | 'startDate' | 'description' | 'mandateId'> &
  PickOptional<SubscriptionData, 'times' | 'method' | 'webhookUrl' | 'metadata'>;

export type GetParameters = ContextParameters;

export type ListParameters = ContextParameters & CommonListParameters;

export type UpdateParameters = ContextParameters & Pick<SubscriptionData, 'mandateId'> & PickOptional<SubscriptionData, 'amount' | 'times' | 'startDate' | 'description' | 'webhookUrl' | 'metadata'>;

export type CancelParameters = ContextParameters;