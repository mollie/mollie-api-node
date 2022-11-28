import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Seal from '../../types/Seal';
import { Links } from '../global';
import Helper from '../Helper';
import Model from '../Model';

export interface IssuerData extends Model<'issuer'> {
  /**
   * The full name of the gift card or voucher issuer.
   */
  description: string;
  /**
   * The status that the issuer is in.
   *
   * Possible values:
   *
   * -   `activated`: The issuer is activated and ready for use.
   * -   `pending-issuer`: Activation of this issuer relies on you taking action with the issuer itself.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/enable-gift-card-issuer?path=status#response
   */
  status: 'activated' | 'pending-issuer';
  /**
   * An object with contractor information.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/enable-voucher-issuer?path=contractor#response
   */
  contractor?: { id: string; name: string; contractId: string };
  _links: Links;
}

type IssuerModel = Seal<IssuerData, Helper<IssuerData, IssuerModel>>;

export default IssuerModel;

export function transform(networkClient: TransformingNetworkClient, input: IssuerData): IssuerModel {
  return Object.assign(Object.create(new Helper<IssuerData, IssuerModel>(networkClient, input._links)), input);
}
