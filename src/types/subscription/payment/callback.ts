import { List } from '../../list';
import { IPayment } from '../../payment';

export type ListCallback = (error: any, payments: List<IPayment>) => void;
