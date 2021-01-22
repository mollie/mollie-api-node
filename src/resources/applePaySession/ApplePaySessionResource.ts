import ApplePaySession, { ApplePaySessionData, injectPrototypes } from '../../data/applePaySession/ApplePaySession';
import NetworkClient from '../../NetworkClient';
import ParentedResource from '../ParentedResource';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import renege from '../../plumbing/renege';

export default class ApplePaySessionResource extends ParentedResource<ApplePaySessionData, ApplePaySession> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(): string {
    return 'wallets/applepay/sessions';
  }

  
}
