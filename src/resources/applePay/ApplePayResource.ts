import { RequestPaymentSessionParameters } from './parameters';
import ApplePaySession from '../../data/applePaySession/ApplePaySession';
import Callback from '../../types/Callback';
import NetworkClient from '../../NetworkClient';
import renege from '../../plumbing/renege';

export default class ApplePayResource {
  constructor(protected readonly networkClient: NetworkClient) {}

  public requestPaymentSession(parameters: RequestPaymentSessionParameters): Promise<ApplePaySession>;
  public requestPaymentSession(parameters: RequestPaymentSessionParameters, callback: Callback<ApplePaySession>): void;
  public requestPaymentSession(parameters: RequestPaymentSessionParameters) {
    if (renege(this, this.requestPaymentSession, ...arguments)) return;
    return this.networkClient.post<ApplePaySession>('wallets/applepay/sessions', parameters);
  }
}
