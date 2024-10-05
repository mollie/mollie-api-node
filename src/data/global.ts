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
  alma = 'alma',
  applepay = 'applepay',
  bacs = 'bacs',
  bancomatpay = 'bancomatpay',
  bancontact = 'bancontact',
  banktransfer = 'banktransfer',
  belfius = 'belfius',
  billie = 'billie',
  blik = 'blik',
  creditcard = 'creditcard',
  directdebit = 'directdebit',
  eps = 'eps',
  giftcard = 'giftcard',
  ideal = 'ideal',
  in3 = 'in3',
  kbc = 'kbc',
  klarna = 'klarna',
  klarnapaylater = 'klarnapaylater',
  klarnapaynow = 'klarnapaynow',
  klarnasliceit = 'klarnasliceit',
  mybank = 'mybank',
  paypal = 'paypal',
  paysafecard = 'paysafecard',
  przelewy24 = 'przelewy24',
  riverty = 'riverty',
  satispay = 'satispay',
  trustly = 'trustly',
  twint = 'twint',
  voucher = 'voucher',
}

export enum HistoricPaymentMethod {
  bitcoin = 'bitcoin',
  inghomepay = 'inghomepay',
  giropay = 'giropay',
  sofort = 'sofort',
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
  /**
   * The street and street number of the address.
   *
   * @see https://docs.mollie.com/overview/common-data-types?path=streetAndNumber#address-object
   */
  streetAndNumber: string;
  /**
   * Any additional addressing details, for example an apartment number.
   *
   * @see https://docs.mollie.com/overview/common-data-types?path=streetAdditional#address-object
   */
  streetAdditional?: string;
  /**
   * The postal code of the address. Required for countries that use postal codes. May only be omitted for these country codes:
   *
   * `AE` `AN` `AO` `AW` `BF` `BI` `BJ` `BO` `BS` `BV` `BW` `BZ` `CD` `CF` `CG` `CI` `CK` `CM` `DJ` `DM` `ER` `FJ` `GA` `GD` `GH` `GM` `GN` `GQ` `GY` `HK` `JM` `KE` `KI` `KM` `KN` `KP` `LC` `ML` `MO`
   * `MR` `MS` `MU` `MW` `NA` `NR` `NU` `PA` `QA` `RW` `SB` `SC` `SL` `SO` `SR` `ST` `SY` `TF` `TK` `TL` `TO` `TT` `TV` `UG` `VU` `YE` `ZM` `ZW`
   *
   * @see https://docs.mollie.com/overview/common-data-types?path=postalCode#address-object
   */
  postalCode: string;
  /**
   * The city of the address.
   *
   * @see https://docs.mollie.com/overview/common-data-types?path=city#address-object
   */
  city: string;
  /**
   * The region of the address.
   *
   * @see https://docs.mollie.com/overview/common-data-types?path=region#address-object
   */
  region?: string;
  /**
   * The country of the address in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.
   *
   * @see https://docs.mollie.com/overview/common-data-types?path=country#address-object
   */
  country: string;
}

export type CardLabel = 'American Express' | 'Carta Si' | 'Carte Bleue' | 'Dankort' | 'Diners Club' | 'Discover' | 'JCB' | 'Laser' | 'Maestro' | 'Mastercard' | 'Unionpay' | 'Visa';

export type CardFailureReason =
  | 'authentication_abandoned'
  | 'authentication_failed'
  | 'authentication_required'
  | 'authentication_unavailable_acs'
  | 'card_declined'
  | 'card_expired'
  | 'inactive_card'
  | 'insufficient_funds'
  | 'invalid_cvv'
  | 'invalid_card_holder_name'
  | 'invalid_card_number'
  | 'invalid_card_type'
  | 'possible_fraud'
  | 'refused_by_issuer'
  | 'unknown_reason';

export type CardAudience = 'consumer' | 'business';

export type FeeRegion = 'american-express' | 'amex-intra-eea' | 'carte-bancaire' | 'intra-eu' | 'intra-eu-corporate' | 'domestic' | 'maestro' | 'other';

export enum SequenceType {
  oneoff = 'oneoff',
  first = 'first',
  recurring = 'recurring',
}

export enum DestinationType {
  organization = 'organization',
}
