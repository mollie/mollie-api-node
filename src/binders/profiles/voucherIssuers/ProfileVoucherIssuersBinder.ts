import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type IssuerModel from '../../../data/issuer/IssuerModel';
import { type IssuerData } from '../../../data/issuer/IssuerModel';
import assertWellFormedId from '../../../plumbing/assertWellFormedId';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type CreateParameters, type Parameters } from './parameters';

function getPathSegments(profileId: string) {
  return `profiles/${profileId}/methods/voucher/issuers`;
}

export default class ProfileVoucherIssuersBinder extends Binder<IssuerData, IssuerModel> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Enable a voucher issuer on a specific or authenticated profile to use it with payments.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/enable-voucher-issuer
   */
  public enable(parameters: CreateParameters): Promise<IssuerModel>;
  public enable(parameters: CreateParameters, callback: Callback<IssuerModel>): void;
  public enable(parameters: CreateParameters) {
    if (renege(this, this.enable, ...arguments)) return;
    const { id, profileId, ...data } = parameters;
    assertWellFormedId(profileId, 'profile');
    return this.networkClient.post(`${getPathSegments(profileId)}/${id}`, data);
  }

  /**
   * Disable a voucher issuer on a specific or authenticated profile.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/disable-voucher-issuer
   */
  public disable(parameters: Parameters): Promise<true>;
  public disable(parameters: Parameters, callback: Callback<true>): void;
  public disable(parameters: Parameters) {
    if (renege(this, this.disable, ...arguments)) return;
    const { id, profileId, ...context } = parameters;
    assertWellFormedId(profileId, 'profile');
    return this.networkClient.delete<IssuerData, true>(`${getPathSegments(profileId)}/${id}`, context);
  }
}
