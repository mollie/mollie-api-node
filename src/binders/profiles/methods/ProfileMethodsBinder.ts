import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import { type MethodData } from '../../../data/methods/data';
import type Method from '../../../data/methods/Method';
import renege from '../../../plumbing/renege';
import assertWellFormedId from '../../../plumbing/assertWellFormedId';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type Parameters } from './parameters';

function getPathSegments(profileId: string) {
  return `profiles/${profileId}/methods`;
}

export default class ProfileMethodsBinder extends Binder<MethodData, Method> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Enable a payment method on a specific or authenticated profile to use it with payments.
   *
   * The payment method `vouchers` cannot be enabled via this API. Instead, refer to /reference/v2/profiles-api/enable-voucher-issuer.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/enable-method
   */
  public enable(parameters: Parameters): Promise<Method>;
  public enable(parameters: Parameters, callback: Callback<Method>): void;
  public enable(parameters: Parameters) {
    if (renege(this, this.enable, ...arguments)) return;
    const { id, profileId, ...data } = parameters;
    assertWellFormedId(profileId, 'profile');
    return this.networkClient.post(`${getPathSegments(profileId)}/${id}`, data);
  }

  /**
   * Disable a payment method on a specific or authenticated profile.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/disable-method
   */
  public disable(parameters: Parameters): Promise<true>;
  public disable(parameters: Parameters, callback: Callback<true>): void;
  public disable(parameters: Parameters) {
    if (renege(this, this.disable, ...arguments)) return;
    const { id, profileId, ...context } = parameters;
    assertWellFormedId(profileId, 'profile');
    return this.networkClient.delete<MethodData, true>(`${getPathSegments(profileId)}/${id}`, context);
  }
}
