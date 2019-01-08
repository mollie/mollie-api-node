import { ICustomer } from '../../customer';
import { List } from '../../list';

export type CreateCallback = (error: any, customer: ICustomer) => void;
export type ListCallback = (error: any, customers: List<ICustomer>) => void;
