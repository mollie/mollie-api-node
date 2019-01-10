import { List } from '../../list';
import { IPayment } from '../../payment';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, payments?: List<IPayment>) => void;
