import { IAmount } from '../../types/global';
import { MandateMethod } from '../mandate';
import { ISubscription } from '../subscription';

export interface ICreateParams {
  customerId: string;
  amount: IAmount;
  times?: number;
  interval: string;
  startDate?: string;
  description: string;
  method: MandateMethod | null;
  mandateId?: string;
  webhookUrl?: string;
  metadata?: string;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
}

export interface IGetParams {
  customerId: string;

  // Access token parameters
  testmode?: boolean;
}

export interface IUpdateParams extends ISubscription {
  customerId: string;

  // Access token parameters
  testmode?: boolean;
}

export interface ICancelParams {
  customerId: string;

  // Access token parameters
  testmode?: boolean;
}

export interface IListParams {
  customerId: string;

  from?: string;
  limit?: number;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
}
