import { ICustomer } from '../customer';
import { IList } from '../list';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (error: any, customer?: ICustomer) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, customer?: ICustomer) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type UpdateCallback = (error: any, customer?: ICustomer) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type DeleteCallback = (error: any, success?: boolean) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, customers?: IList<ICustomer>) => void;
