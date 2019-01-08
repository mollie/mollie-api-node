import { Locale } from '../../global';

export interface ICreateParams {
  customerId: string;

  name?: string;
  email?: string;
  locale: Locale;
  metadata?: any;

  // Access token parameters
  testmode?: boolean;
}

export interface IListParams {
  customerId: string;

  from?: string;
  limit?: number;

  // Access token parameters
  testmode?: boolean;
}
