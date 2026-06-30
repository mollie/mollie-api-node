import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

test('deletePaymentLink', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    let capturedBody: unknown;

    networkMocker
      .spy('DELETE', '/payment-links/pl_4Y0eZitmBnQ6IDoMqZQKh', body => {
        capturedBody = body;
        return [204, ''];
      })
      .twice();

    const result = await bluster(mollieClient.paymentLinks.delete.bind(mollieClient.paymentLinks))('pl_4Y0eZitmBnQ6IDoMqZQKh');

    expect(result).toBe(true);
    // No parameters passed ⇒ empty body; no stray fields are injected.
    expect(capturedBody).toEqual({});
  });
});

test('deletePaymentLinkTestmode', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    let capturedBody: unknown;

    // `delete` sends its context in the request body (not the query string), so assert the body carries
    // testmode ‒ it fails if the parameter is dropped instead of being threaded into the request.
    networkMocker
      .spy('DELETE', '/payment-links/pl_4Y0eZitmBnQ6IDoMqZQKh', body => {
        capturedBody = body;
        return [204, ''];
      })
      .twice();

    const result = await bluster(mollieClient.paymentLinks.delete.bind(mollieClient.paymentLinks))('pl_4Y0eZitmBnQ6IDoMqZQKh', { testmode: true });

    expect(result).toBe(true);
    expect(capturedBody).toEqual({ testmode: true });
  });
});
