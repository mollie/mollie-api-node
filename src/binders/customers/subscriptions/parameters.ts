import { SubscriptionData } from '../../../data/subscriptions/data';
import { PaginationParameters, ThrottlingParameters } from '../../../types/parameters';
import PickOptional from '../../../types/PickOptional';

interface ContextParameters {
  customerId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters &
  Pick<SubscriptionData, 'amount' | 'interval' | 'description' | 'mandateId'> &
  PickOptional<SubscriptionData, 'times' | 'startDate' | 'method' | 'webhookUrl' | 'metadata'>;

export type GetParameters = ContextParameters;

export type ListParameters = ContextParameters & PaginationParameters;

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameters;

export type UpdateParameters = ContextParameters &
  Pick<SubscriptionData, 'mandateId'> &
  PickOptional<SubscriptionData, 'amount' | 'description' | 'interval' | 'metadata' | 'startDate' | 'times' | 'webhookUrl'>;

export type CancelParameters = ContextParameters;
