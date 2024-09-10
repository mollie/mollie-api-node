import { PaymentStatus, SequenceType } from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

function getPayment(status, additionalProperties?: object, additionalLinks?: object) {
  return new NetworkMocker(getApiKeyClientProvider()).use(([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/payments/tr_44aKxzEbr8', 200, {
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
      cancelUrl: 'https://example.org/cancel',
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
    }).twice();

    return bluster(mollieClient.payments.get.bind(mollieClient.payments))('tr_44aKxzEbr8');
  });
}

test('paymentStatuses', () => {
  return Promise.all(
    [
      'pending',
      'authorized',
      'failed',
      'open',
      // (Note that canceled payments usually have their canceledAt set.)
      'canceled',
      // (Note that expired payments usually have their expiredAt set.)
      'expired',
    ].map(async status => {
      const payment = await getPayment(status);

      expect(payment.status).toBe(status);
    }),
  );
});

test('paymentIsPaid', async () => {
  const payment = await getPayment('paid', { paidAt: '2016-10-24' });

  expect(payment.status).toBe(PaymentStatus.paid);
});

test('paymentHasRefunds', async () => {
  let payment = await getPayment('paid', undefined, { refunds: { href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8/refunds', type: 'application/hal+json' } });

  expect(payment.hasRefunds()).toBe(true);

  payment = await getPayment('paid');

  expect(payment.hasRefunds()).toBe(false);
});

test('paymentHasChargebacks', async () => {
  let payment = await getPayment('paid', undefined, { chargebacks: { href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8/chargebacks', type: 'application/hal+json' } });

  expect(payment.hasChargebacks()).toBe(true);

  payment = await getPayment('paid');

  expect(payment.hasChargebacks()).toBe(false);
});

test('paymentHasSequenceType', async () => {
  let payment = await getPayment('paid', { sequenceType: 'first' });

  expect(payment.sequenceType).not.toBe(SequenceType.recurring);
  expect(payment.sequenceType).toBe(SequenceType.first);

  payment = await getPayment('paid', { sequenceType: 'recurring' });

  expect(payment.sequenceType).toBe(SequenceType.recurring);
  expect(payment.sequenceType).not.toBe(SequenceType.first);

  payment = await getPayment('paid' /*, { sequenceType: 'oneoff' } */);

  expect(payment.sequenceType).not.toBe(SequenceType.recurring);
  expect(payment.sequenceType).not.toBe(SequenceType.first);
});

test('paymentGetCheckoutUrl', async () => {
  const payment = await getPayment('open', undefined, { checkout: { href: 'https://example.com', type: 'text/html' } });

  expect(payment.getCheckoutUrl()).toBe('https://example.com');
});

test('paymentCanBeRefunded', async () => {
  let payment = await getPayment('paid' /*, { amountRemaining: { value: '20.00', currency: 'EUR' } } */);

  expect(payment.canBeRefunded()).toBe(true);
  expect(payment.canBePartiallyRefunded()).toBe(true);

  payment = await getPayment('paid', { amountRemaining: undefined, amountRefunded: { value: '20.00', currency: 'EUR' } });

  expect(payment.canBeRefunded()).toBe(false);
  expect(payment.canBePartiallyRefunded()).toBe(false);
});

test('paymentGetAmountRefunded', async () => {
  let payment = await getPayment('paid', { amountRemaining: undefined, amountRefunded: { value: '20.00', currency: 'EUR' } });

  expect(payment.amountRefunded).toEqual({ value: '20.00', currency: 'EUR' });

  payment = await getPayment('paid', { /* amountRemaining: { value: '20.00', currency: 'EUR' }, */ amountRefunded: undefined });

  expect(payment.amountRefunded).toBeUndefined();
});

test('paymentGetAmountRemaining', async () => {
  let payment = await getPayment('paid' /*, { amountRemaining: { value: '20.00', currency: 'EUR' } } */);

  expect(payment.amountRemaining).toEqual({ value: '20.00', currency: 'EUR' });

  payment = await getPayment('paid', { amountRemaining: undefined, amountRefunded: { value: '20.00', currency: 'EUR' } });

  expect(payment.amountRemaining).toBeUndefined();
});
