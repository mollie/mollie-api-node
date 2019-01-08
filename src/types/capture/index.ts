import { ApiMode, IAmount, ILinks } from '../../types/global';

export interface ICapture {
  resource: string;
  id: string;
  mode: ApiMode;
  amount: IAmount;
  settlementAmount: IAmount;
  paymentId: string;
  shipmentId?: string;
  settlementId?: string;
  createdAt: string;
  _links: ILinks;
}
