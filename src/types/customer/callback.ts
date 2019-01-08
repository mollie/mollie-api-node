import { ICustomer } from '../customer';
import { List } from '../list';

export type CreateCallback = (error: any, customer: ICustomer) => void;
export type GetCallback = (error: any, customer: ICustomer) => void;
export type UpdateCallback = (error: any, customer: ICustomer) => void;
export type DeleteCallback = (error: any, success: boolean) => void;
export type ListCallback = (error: any, customers: List<ICustomer>) => void;
