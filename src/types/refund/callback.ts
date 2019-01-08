import { IRefund } from '../refund';
import { List as MollieList } from '../list';

export type ListCallback = (error: any, refunds: MollieList<IRefund>) => void;
