import { IPayment } from '../payment';
import { IList } from '../list';

/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (err: any, payment?: IPayment) => void;
/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (err: any, payment?: IPayment) => void;
/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (err: any, payments?: IList<IPayment>) => void;
/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type UpdateCallback = (err: any, payment?: IPayment) => void;
/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type CancelCallback = (err: any, payment?: IPayment) => void;
