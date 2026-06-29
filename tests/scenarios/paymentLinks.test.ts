import { MollieClient } from '../..';
import getHead from '../getHead';
import NetworkMocker, { getAccessTokenClientProvider } from '../NetworkMocker';

// 'record' ‒ This test interacts with the real Mollie API over the network, and records the communication.
// 'replay' ‒ This test uses existing recordings to simulate the network.
const networkMode = 'replay';

describe('paymentLinks', () => {
  const networkMocker = new NetworkMocker.Auto(networkMode, getAccessTokenClientProvider, 'paymentLinks');
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
    expect(paymentLink.amount?.value).toBe('6.99');
  });

  test('paymentLinks error response', async () => {
    await expect(mollieClient.paymentLinks.get('pl_fake_id')).rejects.toThrow('The resource with the token "pl_fake_id" could not be found.');
  });

  test('paymentLink payments', async () => {
    const paymentLink = await mollieClient.paymentLinks.get('pl_fake_with_payments');

    const payments = paymentLink.getPayments();

    const payment = await getHead(payments.take(1));

    expect(payment.id).toBe('tr_5B8cwPMGnU6qLbRvo7qEZo');
  });

  afterAll(() => networkMocker.cleanup());
});
