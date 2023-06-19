import { ThrottlingParameter } from '../../../types/parameters';
import { PageParameters as PaymentPageParameters } from '../../payments/parameters';

export type PageParameters = PaymentPageParameters & {
  settlementId: string;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
