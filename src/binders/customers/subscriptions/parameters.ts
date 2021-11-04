import { SubscriptionData } from '../../../data/subscription/data';
import { CommonListParameters } from '../../../types/parameters';
import PickOptional from '../../../types/PickOptional';

interface ContextParameters {
  customerId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters &
  Pick<SubscriptionData, 'amount' | 'interval' | 'startDate' | 'description' | 'mandateId'> &
  PickOptional<SubscriptionData, 'times' | 'method' | 'webhookUrl' | 'metadata'>;

export type GetParameters = ContextParameters;

export type ListParameters = ContextParameters & CommonListParameters;

export type UpdateParameters = ContextParameters &
  Pick<SubscriptionData, 'mandateId'> &
  PickOptional<SubscriptionData, 'amount' | 'description' | 'interval' | 'metadata' | 'startDate' | 'times' | 'webhookUrl'>;

export type CancelParameters = ContextParameters;
