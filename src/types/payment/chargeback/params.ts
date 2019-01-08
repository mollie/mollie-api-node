import { PaymentChargebackEmbed } from '../chargeback';

export interface IGetParams {
  paymentId: string;

  embed: Array<PaymentChargebackEmbed>;
}

export interface IListParams {
  paymentId: string;
}
