export type IdealIssuer = string;

export type GiftcardIssuer =
  | 'nationalebioscoopbon'
  | 'nationaleentertainmentcard'
  | 'kunstencultuurcadeaukaart'
  | 'podiumcadeaukaart'
  | 'vvvgiftcard'
  | 'webshopgiftcard'
  | 'yourgift';

export type KbcIssuer = 'kbc' | 'cbc';

export type Issuer = IdealIssuer | GiftcardIssuer | KbcIssuer;
