import { IOrderLine } from '../orderline';
import { IShipmentTracking } from '../shipment';

export interface ICreateParams {
  orderId: string;

  lines: Array<IOrderLine>;
  tracking?: IShipmentTracking;

  // Access token parameters
  testmode?: boolean;
}

export interface IGetParams {
  orderId: string;
}

export interface IListParams {
  orderId: string;
}

export interface IUpdateParams {
  orderId: string;
}
