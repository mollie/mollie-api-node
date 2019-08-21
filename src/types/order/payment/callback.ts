import { IPayment } from '../../payment';

/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (error: any, payment?: IPayment) => void;
