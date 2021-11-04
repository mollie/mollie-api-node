import { CaptureEmbed } from '../../../data/payments/captures/data';

interface ContextParameters {
  paymentId: string;
  testmode?: boolean;
}

export type GetParameters = ContextParameters & {
  embed?: CaptureEmbed[];
};

export type ListParameters = ContextParameters & {
  embed?: CaptureEmbed[];
};
