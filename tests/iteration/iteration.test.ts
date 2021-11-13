import createMollieClient, { ApiMode, MollieClient, Payment, PaymentMethod } from '../..';
import axios from 'axios';
import { setupRecorder } from 'nock-record';
import { run } from 'ruply';
import getAccessToken from '../getAccessToken';

const mockNetwork = true;

describe('iteration', () => {
  let mollieClient: MollieClient;
  let completeRecording: () => void;
  let profileId: string;

  beforeAll(async () => {
    let accessToken: string;
    ({ accessToken, completeRecording } = await run(mockNetwork, async mockNetwork => {
      if (mockNetwork == false) {
        // Obtain an access token from the refresh token.
        const accessToken = await getAccessToken();
        // Record network traffic.
        const { completeRecording } = await setupRecorder({ mode: 'update' })('iteration');
        return { accessToken, completeRecording };
      }
      // Replay recorded network traffic.
      const { completeRecording } = await setupRecorder({ mode: 'lockdown' })('iteration');
      // Return a mock access token.
      return { accessToken: 'access_mock', completeRecording };
    }));
    // Create the Mollie client.
    mollieClient = createMollieClient({ accessToken });
    // Create the test profile.
    profileId = (
      await mollieClient.profiles.create({
        name: 'Iteration test profile',
        email: 'example@example.org',
        phone: '+31208202070',
        website: 'https://example.org',
        mode: ApiMode.test,
      })
    ).id;
    // Enable iDEAL for the test profile. TODO (implement and) use the library API for this.
    await axios.post(`https://api.mollie.com/v2/profiles/${profileId}/methods/${PaymentMethod.ideal}`, undefined, { headers: { Authorization: `Bearer ${accessToken}` } });
    // Create some payments.
    await [
      ['for book #1', '20.00'],
      ['for book #2', '20.00'],
      ['for shoes', '65.00'],
      ['for ankle boots', '72.99'],
      ['for video game #1', '59.99'],
      ['for video game #2', '59.99'],
      ['for train ticket', '19.50'],
    ]
      .reverse()
      .reduce<Promise<any>>(
        (promise, [description, amount]) =>
          promise.then(() =>
            mollieClient.payments.create({
              profileId,
              testmode: true,
              method: PaymentMethod.ideal,
              amount: {
                currency: 'EUR',
                value: amount,
              },
              description: description,
              redirectUrl: 'https://example.org',
              webhookUrl: 'https://example.org/payments/webhook/',
            }),
          ),
        Promise.resolve(),
      );
  });

  test('drop', async () => {
    const next = await mollieClient.payments.iterate({ profileId, testmode: true }).drop(2).next();
    expect(next).toEqual({ done: false, value: expect.objectContaining({ description: 'for shoes' }) });
  });

  test('every', async () => {
    const predicate = jest.fn<boolean, [Payment]>(({ description }) => description.startsWith('for book'));
    const result = await mollieClient.payments.iterate({ profileId, testmode: true }).every(predicate);
    expect(result).toBe(false);
    expect(predicate).toHaveBeenNthCalledWith(1, expect.objectContaining({ description: 'for book #1' }));
    expect(predicate).toHaveBeenNthCalledWith(2, expect.objectContaining({ description: 'for book #2' }));
    expect(predicate).toHaveBeenNthCalledWith(3, expect.objectContaining({ description: 'for shoes' }));
    expect(predicate).toHaveBeenCalledTimes(3);
  });

  test('filter', async () => {
    const callback = jest.fn();
    await mollieClient.payments
      .iterate({ profileId, testmode: true })
      .filter(({ amount }) => parseFloat(amount.value) > 30)
      .forEach(callback);
    expect(callback).toHaveBeenNthCalledWith(1, expect.objectContaining({ description: 'for shoes' }));
    expect(callback).toHaveBeenNthCalledWith(2, expect.objectContaining({ description: 'for ankle boots' }));
    expect(callback).toHaveBeenNthCalledWith(3, expect.objectContaining({ description: 'for video game #1' }));
    expect(callback).toHaveBeenNthCalledWith(4, expect.objectContaining({ description: 'for video game #2' }));
    expect(callback).toHaveBeenCalledTimes(4);
  });

  test('find', async () => {
    const iterator = mollieClient.payments.iterate({ profileId, testmode: true });
    expect(await iterator.find(({ amount }) => amount.value == '65.00')).toEqual(expect.objectContaining({ description: 'for shoes' }));
    expect(await iterator.find(({ amount }) => amount.value == '99.00')).toBe(undefined);
  });

  test('some', async () => {
    const predicate = jest.fn<boolean, [Payment]>(({ description }) => description.includes('shoes'));
    const result = await mollieClient.payments.iterate({ profileId, testmode: true }).some(predicate);
    expect(result).toBe(true);
    expect(predicate).toHaveBeenNthCalledWith(1, expect.objectContaining({ description: 'for book #1' }));
    expect(predicate).toHaveBeenNthCalledWith(2, expect.objectContaining({ description: 'for book #2' }));
    expect(predicate).toHaveBeenNthCalledWith(3, expect.objectContaining({ description: 'for shoes' }));
    expect(predicate).toHaveBeenCalledTimes(3);
  });

  test('take', async () => {
    const iterator = mollieClient.payments.iterate({ profileId, testmode: true }).take(2);
    expect(await iterator.next()).toEqual({ done: false, value: expect.objectContaining({ description: 'for book #1' }) });
    expect(await iterator.next()).toEqual({ done: false, value: expect.objectContaining({ description: 'for book #2' }) });
    expect(await iterator.next()).toEqual({ done: true, value: undefined });
  });

  afterAll(() => completeRecording());
});
