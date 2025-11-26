import type NetworkClient from '../../communication/NetworkClient';
import type Capability from '../../data/capabilities/Capability';
import alias from '../../plumbing/alias';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';

const pathSegment = 'capabilities';

export default class CapabilitiesBinder {
  constructor(protected readonly networkClient: NetworkClient) {
    alias(this, { list: 'page' });
  }

  /**
   * Retrieve a list of capabilities for an organization.
   *
   * This API provides detailed insights into the specific requirements and status of each
   * client's onboarding journey.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/list-capabilities
   */
  public list(): Promise<Capability[]>;
  public list(callback: Callback<Capability[]>): void;
  public list() {
    if (renege(this, this.list, ...arguments)) return;
    return this.networkClient.list<Capability>(pathSegment, 'capabilities', {});
  }
}
