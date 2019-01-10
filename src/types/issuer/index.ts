export type IdealIssuer = string;

export type GiftcardIssuer =
  | 'nationalebioscoopbon'
  | 'nationaleentertainmentcard'
  | 'kunstencultuurcadeaukaart'
  | 'podiumcadeaukaart'
  | 'vvvgiftcard'
  | 'webshopgiftcard'
  | 'yourgift'
  | 'travelcheq'
  | 'fashioncheque';

export type KbcIssuer = 'kbc' | 'cbc';

export type Issuer = IdealIssuer | GiftcardIssuer | KbcIssuer;
