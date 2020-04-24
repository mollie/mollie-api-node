export type IdealIssuer = string;

export type GiftcardIssuer =
  | 'fashioncheque'
  | 'nationalebioscoopbon'
  | 'nationaleentertainmentcard'
  | 'kunstencultuurcadeaukaart'
  | 'podiumcadeaukaart'
  | 'vvvgiftcard'
  | 'vvvdinercheque'
  | 'vvvlekkerweg'
  | 'webshopgiftcard'
  | 'yourgift'
  | 'travelcheq'
  | 'nationalegolfbon'
  | 'sportenfitcadeau';

export type KbcIssuer = 'kbc' | 'cbc';

export type Issuer = IdealIssuer | GiftcardIssuer | KbcIssuer;
