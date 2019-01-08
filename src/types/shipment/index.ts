import { IOrderLine } from '../orderline';
import { ILinks } from '../global';

export interface IShipment {
  resource: string;
  id: string;
  orderId: string;
  createdAt: string;
  tracking: IShipmentTracking | null;
  lines: Array<IOrderLine>;
  _links: ILinks;

  // Access token parameters
  testmode?: boolean;
}

export interface IShipmentTracking {
  carrier: string;
  code: string;
  url?: string;
}
