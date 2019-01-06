declare namespace Mollie {
  type Locale =
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
    | 'lt_LT'

  type Method =
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
    | 'sofort'

  type ApiMode = 'test' | 'live';

  interface Image {
    size1x: string;
    size2x: string;
    svg: string;
  }

  interface Url {
    href: string;
    type: string;
  }

  interface Links {
    self?: Url;
    documentation?: Url;
    [link: string]: any;
  }

  interface Amount {
    currency: string;
    value: string;
  }

  interface Address {
    streetAndNumber?: string;
    postalCode?: string;
    city?: string;
    region?: string;
    country?: string;
  }

  type CardLabel =
    | 'American'
    | 'Express'
    | 'Carta'
    | 'Si'
    | 'Carte'
    | 'Bleue'
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
}
