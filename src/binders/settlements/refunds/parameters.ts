import { ThrottlingParameter } from '../../../types/parameters';
import { PageParameters as RefundsPageParameters } from '../../refunds/parameters';

export type PageParameters = RefundsPageParameters & {
  settlementId: string;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
