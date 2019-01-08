import { IChargeback } from '../../chargeback';
import { List } from '../../list';

export type GetCallback = (error: any, chargeback: IChargeback) => void;
export type ListCallback = (error: any, chargebacks: List<IChargeback>) => void;
