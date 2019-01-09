import { IRefund } from '../../refund';
import { List } from '../../list';

export type CreateCallback = (error: any, refund: IRefund) => void;
export type ListCallback = (error: any, refunds: List<IRefund>) => void;
