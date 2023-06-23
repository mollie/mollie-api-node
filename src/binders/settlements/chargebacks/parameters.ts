import { type ThrottlingParameter } from '../../../types/parameters';
import { type PageParameters as ChargebacksPageParameters } from '../../chargebacks/parameters';

export type PageParameters = ChargebacksPageParameters & {
  settlementId: string;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
