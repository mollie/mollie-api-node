import { IPayment } from '../../payment';

export type CreateCallback = (error: any, payment: IPayment) => void;
