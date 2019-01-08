import { ApiMode, IAmount, ILinks, Locale, PaymentMethod } from '../global';

export interface IPayment {
  resource: string;
  id: string;
  mode: ApiMode;
  createdAt: string;
  status: PaymentStatus;
  isCancelable: boolean;
  authorizedAt?: string;
  paidAt?: string;
  canceledAt?: string;
  expiresAt: string;
  expiredAt?: string;
  failedAt?: string;
  amount: IAmount;
  amountRefunded?: IAmount;
  amountRemaining?: IAmount;
  amountCaptured?: IAmount;
  description: string;
  redirectUrl: string | null;
  webhookUrl?: string;
  method: PaymentMethod;
  metadata: any;
  locale: Locale;
  countryCode?: string;
  profileId: string;
  settlementAmount?: IAmount;
  settlementId?: string;
  customerId?: string;
  sequenceType: string;
  mandateId?: string;
  subscriptionId?: string;
  orderId?: string;
  details?: any;
  applicationFee?: {
    amount: IAmount;
    description: string;
  };
  _links: ILinks;
}

export enum PaymentStatus {
  open = 'open',
  canceled = 'canceled',
  pending = 'pending',
  authorized = 'authorized',
  expired = 'expired',
  failed = 'failed',
  paid = 'paid',
}

export type PaymentInclude = 'details.qrCode';

export enum PaymentEmbed {
  refunds = 'refunds',
  chargebacks = 'chargebacks',
}
