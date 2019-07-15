import { IOrder } from '../order';
import { IList } from '../list';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (error: any, order?: IOrder) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, order?: IOrder) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, orders?: IList<IOrder>) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type UpdateCallback = (error: any, order?: IOrder) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CancelCallback = (error: any, order?: IOrder) => void;
