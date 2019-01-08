import { IChargeback } from '../chargeback';
import { List } from '../list';

export type ListCallback = (error: any, chargebacks: List<IChargeback>) => void;
