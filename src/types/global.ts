export type Locale =
  | 'en_US'
  | 'nl_NL'
  | 'nl_BE'
  | 'fr_FR'
  | 'fr_BE'
  | 'de_DE'
  | 'de_AT'
  | 'de_CH'
  | 'es_ES'
  | 'ca_ES'
  | 'pt_PT'
  | 'it_IT'
  | 'nb_NO'
  | 'sv_SE'
  | 'fi_FI'
  | 'da_DK'
  | 'is_IS'
  | 'hu_HU'
  | 'pl_PL'
  | 'lv_LV'
  | 'lt_LT';

export type PaymentMethod =
  | 'bancontact'
  | 'banktransfer'
  | 'belfius'
  | 'bitcoin'
  | 'creditcard'
  | 'directdebit'
  | 'eps'
  | 'giftcard'
  | 'giropay'
  | 'ideal'
  | 'inghomepay'
  | 'kbc'
  | 'paypal'
  | 'paysafecard'
  | 'sofort';

export type ApiMode = 'test' | 'live';

export interface IImage {
  size1x: string;
  size2x: string;
  svg: string;
}

export interface IUrl {
  href: string;
  type: string;
}

export interface ILinks {
  self?: IUrl;
  documentation?: IUrl;

  [link: string]: IUrl;
}

export interface IAmount {
  currency: string;
  value: string;
}

export interface IAddress {
  streetAndNumber?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  country?: string;
}

export type CardLabel =
  | 'American'
  | 'Express'
  | 'Carta Si'
  | 'Carte Bleue'
  | 'Dankort'
  | 'Diners'
  | 'Club'
  | 'Discover'
  | 'JCB'
  | 'Laser'
  | 'Maestro'
  | 'Mastercard'
  | 'Unionpay'
  | 'Visa'
  | null;

export type CardFailureReason =
  | 'invalid_card_number'
  | 'invalid_cvv'
  | 'invalid_card_holder_name'
  | 'card_expired'
  | 'invalid_card_type'
  | 'refused_by_issuer'
  | 'insufficient_funds'
  | 'inactive_card';

export type CardAudience = 'consumer' | 'business' | null;

export type FeeRegion = 'intra-eu' | 'other';

export enum SequenceType {
  oneoff = 'oneoff',
  first = 'first',
  recurring = 'recurring',
}
