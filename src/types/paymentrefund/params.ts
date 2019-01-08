import { IAmount } from '../global';

export interface ICreateParams {
  amount: IAmount;
  description?: string;
  paymentId?: string;

  // Access token parameters
  testmode?: boolean;
}

export interface IGetParams {
  paymentId: string;
}

export interface IListParams {
  paymentId: string;
}

export interface ICancelParams {
  paymentId: string;
}
