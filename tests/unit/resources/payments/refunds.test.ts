import wireMockClient from '../../../wireMockClient';

test('getRefund', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/payments/tr_44aKxzEbr8/refunds/re_PsAvxvLsnm').reply(200, {
    resource: 'refund',
    id: 're_PsAvxvLsnm',
    amount: {
      value: '20.00',
      currency: 'EUR',
    },
    status: 'pending',
    createdAt: '2018-03-19T12:33:37+00:00',
    description: 'My first API payment',
    paymentId: 'tr_44aKxzEbr8',
    settlementAmount: {
      value: '-20.00',
      currency: 'EUR',
    },
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/payments/tr_Tgxm3amJBT/refunds/re_PmEtpvSsnm',
        type: 'application/hal+json',
      },
      payment: {
        href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/refunds-api/get-refund',
        type: 'text/html',
      },
    },
  });

  const refund = await bluster(client.paymentsRefunds.get.bind(client.paymentsRefunds))('re_PsAvxvLsnm', { paymentId: 'tr_44aKxzEbr8' });

  expect(refund.id).toBe('re_PsAvxvLsnm');

  expect(refund.amount).toEqual({
    value: '20.00',
    currency: 'EUR',
  });

  expect(refund.status).toBe('pending');
  expect(refund.createdAt).toBe('2018-03-19T12:33:37+00:00');
  expect(refund.description).toBe('My first API payment');
  expect(refund.paymentId).toBe('tr_44aKxzEbr8');

  expect(refund.settlementAmount).toEqual({
    value: '-20.00',
    currency: 'EUR',
  });

  expect(refund._links.self).toEqual({
    href: 'https://api.mollie.com/v2/payments/tr_Tgxm3amJBT/refunds/re_PmEtpvSsnm',
    type: 'application/hal+json',
  });

  expect(refund._links.payment).toEqual({
    href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8',
    type: 'application/hal+json',
  });

  expect(refund._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/refunds-api/get-refund',
    type: 'text/html',
  });
});

test('createRefund', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onPost('/payments/tr_44aKxzEbr8/refunds').reply(201, {
    resource: 'refund',
    id: 're_PsAvxvLsnm',
    amount: {
      value: '20.00',
      currency: 'EUR',
    },
    status: 'pending',
    createdAt: '2018-03-19T12:33:37+00:00',
    description: 'My first API payment',
    paymentId: 'tr_44aKxzEbr8',
    settlementAmount: {
      value: '-20.00',
      currency: 'EUR',
    },
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/payments/tr_Tgxm3amJBT/refunds/re_PmEtpvSsnm',
        type: 'application/hal+json',
      },
      payment: {
        href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/refunds-api/create-refund',
        type: 'text/html',
      },
    },
  });

  const refund = await bluster(client.paymentsRefunds.create.bind(client.paymentsRefunds))({ paymentId: 'tr_44aKxzEbr8', amount: { currency: 'EUR', value: '20.00' } });

  expect(refund.id).toBe('re_PsAvxvLsnm');

  expect(refund.amount).toEqual({
    value: '20.00',
    currency: 'EUR',
  });

  expect(refund.status).toBe('pending');
  expect(refund.createdAt).toBe('2018-03-19T12:33:37+00:00');
  expect(refund.description).toBe('My first API payment');
  expect(refund.paymentId).toBe('tr_44aKxzEbr8');

  expect(refund.settlementAmount).toEqual({
    value: '-20.00',
    currency: 'EUR',
  });

  expect(refund._links.self).toEqual({
    href: 'https://api.mollie.com/v2/payments/tr_Tgxm3amJBT/refunds/re_PmEtpvSsnm',
    type: 'application/hal+json',
  });

  expect(refund._links.payment).toEqual({
    href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8',
    type: 'application/hal+json',
  });

  expect(refund._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/refunds-api/create-refund',
    type: 'text/html',
  });
});
