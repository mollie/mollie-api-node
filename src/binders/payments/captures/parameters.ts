import { CaptureEmbed } from '../../../data/payments/captures/data';
import { PaginationParameters, ThrottlingParameter } from '../../../types/parameters';

interface ContextParameters {
  paymentId: string;
  testmode?: boolean;
}

export type GetParameters = ContextParameters & {
  embed?: CaptureEmbed[];
};

export type PageParameters = ContextParameters &
  PaginationParameters & {
    embed?: CaptureEmbed[];
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
