import { IChargeback } from '../../chargeback';
import { IList } from '../../list';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, chargeback?: IChargeback) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, chargebacks?: IList<IChargeback>) => void;
