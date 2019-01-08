import { IAmount, Locale, SequenceType } from '../global';
import { MethodInclude } from '../method';

export interface IGetParams {
  locale?: Locale;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
  include?: Array<MethodInclude>;
}

export interface IListParams {
  sequenceType?: SequenceType;
  locale?: Locale;
  amount?: IAmount;
  resource?: string;
  billingCountry?: string;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
  include?: Array<MethodInclude>;
}
