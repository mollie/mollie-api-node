import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import IssuerModel, { IssuerData } from '../../../data/issuer/IssuerModel';
import ApiError from '../../../errors/ApiError';
import renege from '../../../plumbing/renege';
import checkId from '../../../plumbing/checkId';
import Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { Parameters } from './parameters';

function getPathSegments(profileId: string) {
  return `profiles/${profileId}/methods/giftcard/issuers`;
}

export default class ProfileGiftcardIssuersBinder extends Binder<IssuerData, IssuerModel> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Enable a gift card issuer on a specific or authenticated profile to use it with payments.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/enable-gift-card-issuer
   */
  public enable(parameters: Parameters): Promise<IssuerModel>;
  public enable(parameters: Parameters, callback: Callback<IssuerModel>): void;
  public enable(parameters: Parameters) {
    if (renege(this, this.enable, ...arguments)) return;
    if (!checkId(parameters.profileId, 'profile')) {
      throw new ApiError('The profile id is invalid');
    }
    return this.networkClient.post(`${getPathSegments(parameters.profileId)}/${parameters.id}`, undefined);
  }

  /**
   * Disable a gift card issuer on a specific or authenticated profile.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/disable-gift-card-issuer
   */
  public disable(parameters: Parameters): Promise<true>;
  public disable(parameters: Parameters, callback: Callback<true>): void;
  public disable(parameters: Parameters) {
    if (renege(this, this.enable, ...arguments)) return;
    if (!checkId(parameters.profileId, 'profile')) {
      throw new ApiError('The profile id is invalid');
    }
    return this.networkClient.delete<IssuerData, true>(`${getPathSegments(parameters.profileId)}/${parameters.id}`);
  }
}
