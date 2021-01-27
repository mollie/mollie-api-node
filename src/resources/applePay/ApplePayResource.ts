import { RequestPaymentSessionParameters } from './parameters';
import Callback from '../../types/Callback';
import ApplePaySession, { ApplePaySessionData, injectPrototypes } from '../../data/applePaySession/ApplePaySession';
import NetworkClient from '../../NetworkClient';
import ParentedResource from '../ParentedResource';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import renege from '../../plumbing/renege';

export default class ApplePayResource extends ParentedResource<ApplePaySessionData, ApplePaySession> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(): string {
    return 'wallets/applepay/sessions';
  }

  public requestPaymentSession(parameters: RequestPaymentSessionParameters): Promise<ApplePaySession>;
  public requestPaymentSession(parameters: RequestPaymentSessionParameters, callback: Callback<ApplePaySession>): void;
  public requestPaymentSession(parameters: RequestPaymentSessionParameters) {
    if (renege(this, this.requestPaymentSession, ...arguments)) return;
    return this.networkClient.post(this.getResourceUrl(), parameters);
  }
}
