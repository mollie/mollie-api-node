// FIXME: check props
import { IOrderLine } from '../orderline';

export interface IOrderRefund {
  description?: string;
  orderId?: string;
  lines: Array<IOrderLine>;

  // Access token parameters
  testmode?: boolean;
}
