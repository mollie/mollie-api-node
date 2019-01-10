import { IChargeback } from '../chargeback';
import { List } from '../list';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, chargebacks?: List<IChargeback>) => void;
