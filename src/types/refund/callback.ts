import { IList } from '@mollie-types/list';
import { IRefund } from '@mollie-types/payment/refund';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, refunds?: IList<IRefund>) => void;
