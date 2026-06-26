import { type ChargebackEmbed } from '../../../data/chargebacks/Chargeback';
import { type PaginationParameters, type TestModeParameter, type ThrottlingParameter } from '../../../types/parameters';

type ContextParameters = TestModeParameter & {
  paymentId: string;
};

export type GetParameters = ContextParameters & {
  embed?: ChargebackEmbed[];
};

export type PageParameters = ContextParameters &
  PaginationParameters & {
    embed?: ChargebackEmbed[];
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
