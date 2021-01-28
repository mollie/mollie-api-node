import wireMockClient from '../../wireMockClient';

test('requestApplePayPaymentSession', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onPost('/wallets/applepay/sessions').reply(201, {
    epochTimestamp: 1555507053169,
    expiresAt: 1555510653169,
    merchantSessionIdentifier: 'SSH2EAF8AFAEAA94DEEA898162A5DAFD36E_916523AAED1343F5BC5815E12BEE9250AFFDC1A17C46B0DE5A943F0F94927C24',
    nonce: '0206b8db',
    merchantIdentifier: 'BD62FEB196874511C22DB28A9E14A89E3534C93194F73EA417EC566368D391EB',
    domainName: 'pay.example.org',
    displayName: "Chuck Norris's Store",
    signature: '308006092a864886f7...8cc030ad3000000000000',
  });

  const applePaySession = await bluster(client.applePay.requestPaymentSession.bind(client.applePay))({
    domain: 'pay.mywebshop.com',
    validationUrl: 'https://apple-pay-gateway-cert.apple.com/paymentservices/paymentSession',
  });

  expect(applePaySession.epochTimestamp).toBe(1555507053169);
  expect(applePaySession.expiresAt).toBe(1555510653169);
  expect(applePaySession.merchantSessionIdentifier).toBe('SSH2EAF8AFAEAA94DEEA898162A5DAFD36E_916523AAED1343F5BC5815E12BEE9250AFFDC1A17C46B0DE5A943F0F94927C24');
  expect(applePaySession.nonce).toBe('0206b8db');
  expect(applePaySession.merchantIdentifier).toBe('BD62FEB196874511C22DB28A9E14A89E3534C93194F73EA417EC566368D391EB');
  expect(applePaySession.domainName).toBe('pay.example.org');
  expect(applePaySession.displayName).toBe("Chuck Norris's Store");
  expect(applePaySession.signature).toBe('308006092a864886f7...8cc030ad3000000000000');
});
