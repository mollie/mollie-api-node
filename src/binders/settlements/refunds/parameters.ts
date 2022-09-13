import { ThrottlingParameters } from '../../../types/parameters';
import { ListParameters as RefundsListParameters } from '../../refunds/parameters';

export type ListParameters = RefundsListParameters & {
  settlementId: string;
};

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameters;
