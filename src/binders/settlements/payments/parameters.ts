import { type ThrottlingParameter } from '../../../types/parameters';
import { type PageParameters as PaymentPageParameters } from '../../payments/parameters';

export type PageParameters = PaymentPageParameters & {
  settlementId: string;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
