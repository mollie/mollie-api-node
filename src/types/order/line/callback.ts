import { IOrder } from '../../order';

/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type UpdateCallback = (error: any, order?: IOrder) => void;
/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type CancelCallback = (error: any, success?: boolean) => void;
