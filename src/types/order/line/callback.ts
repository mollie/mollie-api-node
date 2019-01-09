import { IOrder } from '../../order';

export type UpdateCallback = (error: any, order: IOrder) => void;
export type CancelCallback = (error: any, success: boolean) => void;
