import { type ThrottlingParameter } from '../../../types/parameters';
import { type PageParameters as CapturePageParameters } from '../../payments/captures/parameters';

export type PageParameters = Omit<CapturePageParameters, 'paymentId'> & {
  settlementId: string;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
