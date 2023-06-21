import { type ThrottlingParameter } from '../../../types/parameters';
import { type PageParameters as RefundsPageParameters } from '../../refunds/parameters';

export type PageParameters = RefundsPageParameters & {
  settlementId: string;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
