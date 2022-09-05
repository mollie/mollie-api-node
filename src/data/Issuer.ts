export type IdealIssuer = string;

export type GiftcardIssuer =
  | 'beautycadeaukaart'
  | 'bloemencadeaukaart'
  | 'bloemplantgiftcard'
  | 'boekenbon'
  | 'decadeaukaart'
  | 'delokalecadeaukaart'
  | 'dinercadeau'
  | 'doenkadotickets'
  | 'fashioncheque'
  | 'festivalcadeau'
  | 'good4fun'
  | 'huistuincadeaukaart'
  | 'jewelcard'
  | 'kluscadeau'
  | 'kunstencultuurcadeaukaart'
  | 'nationalebioscoopbon'
  | 'nationaleentertainmentcard'
  | 'nationalegolfbon'
  | 'ohmygood'
  | 'podiumcadeaukaart'
  | 'reiscadeau'
  | 'restaurantcadeau'
  | 'sodexosportculturepass'
  | 'sportenfitcadeau'
  | 'sustainablefashion'
  | 'travelcheq'
  | 'vvvgiftcard'
  | 'vvvdinercheque'
  | 'vvvlekkerweg'
  | 'webshopgiftcard'
  | 'wijncadeaukaart'
  | 'yourgift';

export type KbcIssuer = 'kbc' | 'cbc';

type VoucherIssuer = string;

export type Issuer = IdealIssuer | GiftcardIssuer | KbcIssuer | VoucherIssuer;
