import { IOrderLine } from '../orderline';

export interface ICreateParams {
  orderId: string;

  description?: string;
  lines: Array<IOrderLine>;

  // Access token parameters
  testmode?: boolean;
}

export interface IListParams {
  orderId: string;

  // Access token parameters
  testmode?: boolean;
}
