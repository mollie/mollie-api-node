import { ThrottlingParameter } from '../../../types/parameters';
import { ListParameters as CaptureListParameters } from '../../payments/captures/parameters';

export type ListParameters = Omit<CaptureListParameters, 'paymentId'> & {
  settlementId: string;
};

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameter;
