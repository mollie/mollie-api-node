import createMollieClient from '../..';

test('client object should have aliases for backwards-compatibility', () => {
  const client = createMollieClient({ apiKey: 'mock-api-key' });
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  expect(client.payments_refunds).toBe(client.paymentRefunds);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  expect(client.customers_subscriptions).toBe(client.customerSubscriptions);
});
