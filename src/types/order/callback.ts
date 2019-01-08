import { IOrder } from '../order';
import { List as IList } from '../list';

export type CreateCallback = (error: any, order: IOrder) => void;
export type GetCallback = (error: any, order: IOrder) => void;
export type ListCallback = (error: any, orders: IList<IOrder>) => void;
export type UpdateCallback = (error: any, order: IOrder) => void;
export type CancelCallback = (error: any, order: IOrder) => void;
