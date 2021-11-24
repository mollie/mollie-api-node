import { MollieClient } from '../../dist/types/src/types';
import NetworkMocker, { apiKeyClientFactory } from '../NetworkMocker';

// false ‒ This test interacts with the real Mollie API over the network, and records the communication.
// true  ‒ This test uses existing recordings to simulate the network.
const mockNetwork = true;

describe('paymentLinks', () => {
  const networkMocker = new NetworkMocker(mockNetwork, apiKeyClientFactory, 'paymentLinks');
  let mollieClient: MollieClient;

  beforeAll(async () => {
    mollieClient = await networkMocker.prepare();
  });

  test('paymentLinks', async () => {
    let paymentLink = await mollieClient.paymentLinks.create({
      amount: {
        currency: 'EUR',
        value: '6.99',
      },
      description: 'Hair pin',
    });
    expect(paymentLink.getPaymentUrl()).toMatch(/^https:\/\/paymentlink\.mollie\.com\//);
    paymentLink = await mollieClient.paymentLinks.get(paymentLink.id);
    expect(paymentLink.amount.value).toBe('6.99');
  });

  afterAll(() => networkMocker.cleanup());
});
