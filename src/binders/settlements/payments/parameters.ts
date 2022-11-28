import { ThrottlingParameters } from '../../../types/parameters';
import { ListParameters as PaymentListParameters } from '../../payments/parameters';

export type ListParameters = PaymentListParameters & {
  settlementId: string;
};

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameters;
