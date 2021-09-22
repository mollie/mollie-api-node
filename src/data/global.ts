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
  applepay = 'applepay',
  bancontact = 'bancontact',
  banktransfer = 'banktransfer',
  belfius = 'belfius',
  creditcard = 'creditcard',
  directdebit = 'directdebit',
  eps = 'eps',
  giftcard = 'giftcard',
  giropay = 'giropay',
  ideal = 'ideal',
  kbc = 'kbc',
  klarnapaylater = 'klarnapaylater',
  klarnasliceit = 'klarnasliceit',
  paypal = 'paypal',
  paysafecard = 'paysafecard',
  przelewy24 = 'przelewy24',
  sofort = 'sofort',
}

export enum HistoricPaymentMethod {
  bitcoin = 'bitcoin',
  inghomepay = 'inghomepay',
}

export enum ApiMode {
  test = 'test',
  live = 'live',
}

export interface Url {
  href: string;
  type: string;
}

export interface Links {
  self: Url;
  documentation: Url;
}

export interface Amount {
  currency: string;
  value: string;
}

export interface Address {
  streetAndNumber: string;
  streetAdditional?: string;
  postalCode: string;
  city: string;
  region?: string;
  country: string;
}

export type CardLabel = 'American Express' | 'Carta Si' | 'Carte Bleue' | 'Dankort' | 'Diners' | 'Club' | 'Discover' | 'JCB' | 'Laser' | 'Maestro' | 'Mastercard' | 'Unionpay' | 'Visa';

export type CardFailureReason =
  | 'authentication_failed'
  | 'card_expired'
  | 'inactive_card'
  | 'insufficient_funds'
  | 'invalid_card_holder_name'
  | 'invalid_card_number'
  | 'invalid_card_type'
  | 'invalid_cvv'
  | 'possible_fraud'
  | 'refused_by_issuer'
  | 'unknown_reason';

export type CardAudience = 'consumer' | 'business';

export type FeeRegion = 'american-express' | 'carte-bancaire' | 'intra-eu' | 'maestro' | 'other';

export enum SequenceType {
  oneoff = 'oneoff',
  first = 'first',
  recurring = 'recurring',
}

export type MollieApiErrorLinks = Record<string, Url> & Links;

export interface MollieApiError {
  status?: number;
  title: string;
  detail: string;
  field?: string;
  _links?: MollieApiErrorLinks;
}
