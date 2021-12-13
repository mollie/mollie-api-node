import { CaptureEmbed } from '../../../data/payments/captures/data';
import { PaginationParameters } from '../../../types/parameters';

interface ContextParameters {
  paymentId: string;
  testmode?: boolean;
}

export type GetParameters = ContextParameters & {
  embed?: CaptureEmbed[];
};

export type ListParameters = ContextParameters &
  PaginationParameters & {
    embed?: CaptureEmbed[];
  };
