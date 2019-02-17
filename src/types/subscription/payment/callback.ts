import { IList } from '@mollie-types/list';
import { IPayment } from '@mollie-types/payment';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, payments?: IList<IPayment>) => void;
