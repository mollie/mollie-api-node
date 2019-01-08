import { IPayment } from '../payment';
import { List as MollieList } from '../list';

export type CreateCallback = (err: any, payment: IPayment) => void;
export type GetCallback = (err: any, payment: IPayment) => void;
export type ListCallback = (err: any, payments: MollieList<IPayment>) => void;
export type UpdateCallback = (err: any, payment: IPayment) => void;
export type CancelCallback = (err: any, payment: IPayment) => void;
