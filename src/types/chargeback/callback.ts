import { IChargeback } from '@mollie-types/chargeback';
import { IList } from '@mollie-types/list';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, chargebacks?: IList<IChargeback>) => void;
