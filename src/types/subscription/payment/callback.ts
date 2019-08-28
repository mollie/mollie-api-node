import { IList } from '../../list';
import { IPayment } from '../../payment';

/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, payments?: IList<IPayment>) => void;
