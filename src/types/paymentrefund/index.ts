import { IAmount, ILinks } from '../global';
import { RefundStatus } from '../refund';

export interface IPaymentRefund {
  resource: string;
  id: string;
  amount: IAmount;
  status: RefundStatus;
  createdAt: string;
  description: string;
  paymentId: string;
  settlementAmount?: IAmount;
  _links: ILinks;
}
