import { ApiMode, IAmount, ILinks } from '../../types/global';

export interface ISubscription {
  resource: string;
  id: string;
  mode: ApiMode;
  status: SubscriptionStatus;
  amount: IAmount;
  times: number;
  timesRemaining: number;
  interval: string;
  startDate: string;
  nextPaymentDate?: string;
  description: string;
  method: string;
  mandateId?: string;
  createdAt?: string;
  canceledAt: string;
  webhookUrl: string;
  metadata: any;
  _links: ILinks;

  // Access token parameters
  testmode?: boolean;
}

export enum SubscriptionStatus {
  pending = 'pending',
  active = 'active',
  canceled = 'canceled',
  suspended = 'suspended',
  completed = 'completed',
}
