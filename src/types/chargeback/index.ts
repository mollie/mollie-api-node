import { IAmount, ILinks } from '../global';

export interface IChargeback {
  resource: string;
  id: string;
  amount: IAmount;
  settlementAmount: IAmount;
  createdAt: string;
  reversedAt: string;
  paymentId: string;
  _links: ILinks;
}
