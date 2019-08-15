import wireMockClient from '../../wireMockClient';

async function getPayment(status, additionalProperties?: object, additionalLinks?: object) {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/payments/tr_44aKxzEbr8').reply(200, {
    resource: 'payment',
    id: 'tr_44aKxzEbr8',
    mode: 'test',
    createdAt: '2018-03-13T14:02:29+00:00',
    amount: {
      value: '20.00',
      currency: 'EUR',
    },
    description: 'My first API payment',
    method: 'ideal',
    metadata: {
      order_id: '1234',
    },
    status,
    amountRefunded: {
      value: '0.00',
      currency: 'EUR',
    },
    amountRemaining: {
      value: '20.00',
      currency: 'EUR',
    },
    details: {
      consumerName: 'T. TEST',
      consumerAccount: 'NL17RABO0213698412',
      consumerBic: 'TESTNL99',
    },
    locale: 'nl_NL',
    countryCode: 'NL',
    profileId: 'pfl_2A1gacu42V',
    sequenceType: 'oneoff',
    redirectUrl: 'https://example.org/redirect',
    webhookUrl: 'https://example.org/webhook',
    settlementAmount: {
      value: '20.00',
      currency: 'EUR',
    },
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/payments-api/get-payment',
        type: 'text/html',
      },
      ...additionalLinks,
    },
    ...additionalProperties,
  });

  return await client.payments.get('tr_44aKxzEbr8');
}

test('paymentStatuses', () => {
  return Promise.all(
    [
      ['pending', 'isPending', true],
      ['pending', 'isAuthorized', false],
      ['pending', 'isFailed', false],
      ['pending', 'isOpen', false],
      ['pending', 'isCanceled', false],
      ['pending', 'isPaid', false],
      ['pending', 'isExpired', false],

      ['authorized', 'isPending', false],
      ['authorized', 'isAuthorized', true],
      ['authorized', 'isFailed', false],
      ['authorized', 'isOpen', false],
      ['authorized', 'isCanceled', false],
      ['authorized', 'isPaid', false],
      ['authorized', 'isExpired', false],

      ['failed', 'isPending', false],
      ['failed', 'isAuthorized', false],
      ['failed', 'isFailed', true],
      ['failed', 'isOpen', false],
      ['failed', 'isCanceled', false],
      ['failed', 'isPaid', false],
      ['failed', 'isExpired', false],

      ['open', 'isPending', false],
      ['open', 'isAuthorized', false],
      ['open', 'isFailed', false],
      ['open', 'isOpen', true],
      ['open', 'isCanceled', false],
      ['open', 'isPaid', false],
      ['open', 'isExpired', false],

      // (Note that canceled payments usually have their canceledAt set.)
      ['canceled', 'isPending', false],
      ['canceled', 'isAuthorized', false],
      ['canceled', 'isFailed', false],
      ['canceled', 'isOpen', false],
      ['canceled', 'isCanceled', true],
      ['canceled', 'isPaid', false],
      ['canceled', 'isExpired', false],

      // (Note that expired payments usually have their expiredAt set.)
      ['expired', 'isPending', false],
      ['expired', 'isAuthorized', false],
      ['expired', 'isFailed', false],
      ['expired', 'isOpen', false],
      ['expired', 'isCanceled', false],
      ['expired', 'isPaid', false],
      ['expired', 'isExpired', true],
    ].map(async ([status, method, expectedResult]) => {
      const payment = await getPayment(status);

      expect(payment[method as string]()).toBe(expectedResult);
    }),
  );
});

test('paymentIsPaid', async () => {
  const payment = await getPayment('paid', { paidAt: '2016-10-24' });

  expect(payment.isPaid()).toBe(true);
});

test('paymentHasRefunds', async () => {
  var payment = await getPayment('paid', undefined, { refunds: { href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8/refunds', type: 'application/hal+json' } });

  expect(payment.hasRefunds()).toBe(true);

  payment = await getPayment('paid');

  expect(payment.hasRefunds()).toBe(false);
});

test('paymentHasChargebacks', async () => {
  var payment = await getPayment('paid', undefined, { chargebacks: { href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8/chargebacks', type: 'application/hal+json' } });

  expect(payment.hasChargebacks()).toBe(true);

  payment = await getPayment('paid');

  expect(payment.hasChargebacks()).toBe(false);
});

test('paymentHasSequenceType', async () => {
  var payment = await getPayment('paid', { sequenceType: 'first' });

  expect(payment.hasSequenceTypeRecurring()).toBe(false);
  expect(payment.hasSequenceTypeFirst()).toBe(true);

  payment = await getPayment('paid', { sequenceType: 'recurring' });

  expect(payment.hasSequenceTypeRecurring()).toBe(true);
  expect(payment.hasSequenceTypeFirst()).toBe(false);

  payment = await getPayment('paid' /*, { sequenceType: 'oneoff' } */);

  expect(payment.hasSequenceTypeRecurring()).toBe(false);
  expect(payment.hasSequenceTypeFirst()).toBe(false);
});

test('paymentGetCheckoutUrl', async () => {
  var payment = await getPayment('open', undefined, { checkout: { href: 'https://example.com', type: 'text/html' } });

  expect(payment.getCheckoutUrl()).toBe('https://example.com');
});

test('paymentCanBeRefunded', async () => {
  var payment = await getPayment('paid' /*, { amountRemaining: { value: '20.00', currency: 'EUR' } } */);

  expect(payment.canBeRefunded()).toBe(true);
  expect(payment.canBePartiallyRefunded()).toBe(true);

  payment = await getPayment('paid', { amountRemaining: undefined, amountRefunded: { value: '20.00', currency: 'EUR' } });

  expect(payment.canBeRefunded()).toBe(false);
  expect(payment.canBePartiallyRefunded()).toBe(false);
});

test('paymentGetAmountRefunded', async () => {
  var payment = await getPayment('paid', { amountRemaining: undefined, amountRefunded: { value: '20.00', currency: 'EUR' } });

  expect(payment.getAmountRefunded()).toEqual({ value: '20.00', currency: 'EUR' });

  payment = await getPayment('paid', { /* amountRemaining: { value: '20.00', currency: 'EUR' }, */ amountRefunded: undefined });

  expect(payment.getAmountRefunded()).toEqual({ value: '0.00', currency: 'EUR' });
});

test('paymentGetAmountRemaining', async () => {
  var payment = await getPayment('paid' /*, { amountRemaining: { value: '20.00', currency: 'EUR' } } */);

  expect(payment.getAmountRemaining()).toEqual({ value: '20.00', currency: 'EUR' });

  payment = await getPayment('paid', { amountRemaining: undefined, amountRefunded: { value: '20.00', currency: 'EUR' } });

  expect(payment.getAmountRemaining()).toEqual({ value: '0.00', currency: 'EUR' });
});
