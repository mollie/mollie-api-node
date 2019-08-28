import { IList } from '../../list';
import { IRefund } from '../../payment/refund';

/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (error: any, refund?: IRefund) => void;
/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, refunds?: IList<IRefund>) => void;
