import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type ClientLink from '../../data/client-links/ClientLink';
import { type ClientLinkData } from '../../data/client-links/data';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import { type CreateParameters } from './parameters';

const pathSegment = 'client-links';

export default class ClientLinksBinder {
  constructor(protected readonly networkClient: TransformingNetworkClient) {}

  /**
   * Link a new or existing organization to your OAuth application, in effect creating a new client.
   * The response contains a `clientLink` where you should redirect your customer to.
   *
   * Note: Before redirecting the customer to the `clientLink` URL, you need to append the following
   * query parameters: `client_id`, `state`, `scope`, and optionally `approval_prompt`.
   *
   * A client link must be used within 30 days of creation. After that period, it will expire and
   * you will need to create a new client link.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/create-client-link
   */
  public create(parameters: CreateParameters): Promise<ClientLink>;
  public create(parameters: CreateParameters, callback: Callback<ClientLink>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    return this.networkClient.post<ClientLinkData, ClientLink>(pathSegment, parameters);
  }
}
