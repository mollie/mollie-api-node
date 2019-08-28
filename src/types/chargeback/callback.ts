import { IChargeback } from '../chargeback';
import { IList } from '../list';

/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, chargebacks?: IList<IChargeback>) => void;
