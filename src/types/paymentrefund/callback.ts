import { List as MollieList } from '../list';
import { IPaymentRefund } from '../paymentrefund';

export type CreateCallback = (err: any, refund: IPaymentRefund) => void;
export type GetCallback = (err: any, refund: IPaymentRefund) => void;
export type ListCallback = (err: any, refund: MollieList<IPaymentRefund>) => void;
export type CancelCallback = (err: any, status: boolean) => void;
