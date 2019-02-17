/* eslint-disable @typescript-eslint/camelcase */
export enum Locale {
  en_US = 'en_US',
  nl_NL = 'nl_NL',
  nl_BE = 'nl_BE',
  fr_FR = 'fr_FR',
  fr_BE = 'fr_BE',
  de_DE = 'de_DE',
  de_AT = 'de_AT',
  de_CH = 'de_CH',
  es_ES = 'es_ES',
  ca_ES = 'ca_ES',
  pt_PT = 'pt_PT',
  it_IT = 'it_IT',
  nb_NO = 'nb_NO',
  sv_SE = 'sv_SE',
  fi_FI = 'fi_FI',
  da_DK = 'da_DK',
  is_IS = 'is_IS',
  hu_HU = 'hu_HU',
  pl_PL = 'pl_PL',
  lv_LV = 'lv_LV',
  lt_LT = 'lt_LT',
}

export enum PaymentMethod {
  bancontact = 'bancontact',
  banktransfer = 'banktransfer',
  belfius = 'belfius',
  bitcoin = 'bitcoin',
  creditcard = 'creditcard',
  directdebit = 'directdebit',
  eps = 'eps',
  giftcard = 'giftcard',
  giropay = 'giropay',
  ideal = 'ideal',
  inghomepay = 'inghomepay',
  kbc = 'kbc',
  klarnapaylater = 'klarnapaylater',
  klarnasliceit = 'klarnasliceit',
  paypal = 'paypal',
  paysafecard = 'paysafecard',
  przelewy24 = 'przelewy24',
  sofort = 'sofort',
}

export enum ApiMode {
  test = 'test',
  live = 'live',
}

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
  self: IUrl;
  documentation: IUrl;
}

export interface IListLinks extends ILinks {
  next: IUrl;
  previous: IUrl;
}

export interface IAmount {
  currency: string;
  value: string;
}

export interface IAddress {
  streetAndNumber: string;
  streetAdditional?: string;
  postalCode: string;
  city: string;
  region?: string;
  country: string;
}

export type CardLabel = 'American Express' | 'Carta Si' | 'Carte Bleue' | 'Dankort' | 'Diners' | 'Club' | 'Discover' | 'JCB' | 'Laser' | 'Maestro' | 'Mastercard' | 'Unionpay' | 'Visa' | null;

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

export type IMollieApiErrorLinks = { [key: string]: IUrl } | ILinks;

export interface IMollieApiError {
  status?: number;
  title: string;
  detail: string;
  field?: string;
  _links?: IMollieApiErrorLinks;
}
