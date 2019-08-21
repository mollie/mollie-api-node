import { ICustomer } from '../../customer';
import { IList } from '../../list';

/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (error: any, customer?: ICustomer) => void;
/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, customers?: IList<ICustomer>) => void;
