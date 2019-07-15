import { IList } from '../../list';
import { IRefund } from '../../payment/refund';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (err: any, refund?: IRefund) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (err: any, refund?: IRefund) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (err: any, refund?: IList<IRefund>) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CancelCallback = (err: any, status?: boolean) => void;
