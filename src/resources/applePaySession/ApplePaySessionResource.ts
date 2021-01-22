import { ValidateParameters } from './parameters';
import Callback from '../../types/Callback';
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

  public validate(parameters: ValidateParameters): Promise<ApplePaySession>;
  public validate(parameters: ValidateParameters, callback: Callback<ApplePaySession>): void;
  public validate(parameters: ValidateParameters) {
    if (renege(this, this.validate, ...arguments)) return;
    const test = this.networkClient.post(this.getResourceUrl(), parameters);

    console.log(test);
    return test;
  }
}
