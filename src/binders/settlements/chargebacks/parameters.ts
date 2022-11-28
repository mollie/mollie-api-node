import { ThrottlingParameters } from '../../../types/parameters';
import { ListParameters as ChargebacksListParameters } from '../../chargebacks/parameters';

export type ListParameters = ChargebacksListParameters & {
  settlementId: string;
};

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameters;
