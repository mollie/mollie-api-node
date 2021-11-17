import { MollieClient } from '../../dist/types/src/types';
import NetworkMocker, { apiKeyClientFactory } from '../NetworkMocker';

// false ‒ This test interacts with the real Mollie API over the network, and records the communication.
// true  ‒ This test uses existing recordings to simulate the network.
const mockNetwork = true;

describe('multipage-iteration', () => {
  const networkMocker = new NetworkMocker(mockNetwork, apiKeyClientFactory, 'multipage-iteration');
  let mollieClient: MollieClient;
  let total: number;

  beforeAll(async () => {
    mollieClient = await networkMocker.prepare();
    // Ensure there are at least 251 payments.
    const payments = await mollieClient.payments.page({ limit: 250 });
    if (payments.nextPageCursor == undefined) {
      console.warn(`There are ${payments.length} payments; having at least 251 would prove beyond any doubt that multiple pages are handled correctly`);
      total = payments.length;
      return;
    }
    total = 251;
  });

  test('multipage-iteration', async () => {
    let count = 0;
    expect(await mollieClient.payments.iterate().some(() => ++count == total)).toBe(true);
  });

  afterAll(() => networkMocker.cleanup());
});
