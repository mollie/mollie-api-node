import createMollieClient, { type MollieClient } from '../..';
import NetworkMocker from '../NetworkMocker';

// A client default only exists on the OAuth/access-token branch (see the Xor in Options).
function clientWith(parameterDefaults?: { testmode?: boolean; profileId?: string }) {
  return () => createMollieClient({ accessToken: 'access_mock', parameterDefaults });
}

const payment = {
  resource: 'payment',
  id: 'tr_mock0001',
  mode: 'test',
  createdAt: '2024-01-01T00:00:00+00:00',
  amount: { value: '10.00', currency: 'EUR' },
  description: 'A payment',
  status: 'open',
  profileId: 'pfl_mock',
  _links: { self: { href: 'https://api.mollie.com/v2/payments/tr_mock0001', type: 'application/hal+json' } },
};

const paymentsPage = {
  _embedded: { payments: [payment] },
  count: 1,
  _links: {
    self: { href: 'https://api.mollie.com/v2/payments', type: 'application/hal+json' },
    documentation: { href: 'https://docs.mollie.com/reference/list-payments', type: 'text/html' },
    previous: null,
    next: null,
  },
};

test('injects the client defaults into query parameters', () => {
  return new NetworkMocker(clientWith({ testmode: true, profileId: 'pfl_mock' })).use(async ([mollieClient, networkMocker]) => {
    // Interceptor only matches when both defaults are threaded into the query string.
    networkMocker.intercept('GET', '/payments?testmode=true&profileId=pfl_mock', 200, paymentsPage).twice();

    const payments = await bluster(mollieClient.payments.page.bind(mollieClient.payments))({});

    expect(payments.length).toBe(1);
  });
});

test('injects the client defaults even when no parameters object is passed', () => {
  return new NetworkMocker(clientWith({ testmode: true, profileId: 'pfl_mock' })).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/payments?testmode=true&profileId=pfl_mock', 200, paymentsPage).twice();

    // No arguments at all ‒ the wrapper inserts a parameters object before the callback.
    const payments = await bluster(mollieClient.payments.page.bind(mollieClient.payments))();

    expect(payments.length).toBe(1);
  });
});

test('treats an explicit undefined parameters argument the same as {}', () => {
  return new NetworkMocker(clientWith({ testmode: true, profileId: 'pfl_mock' })).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/payments?testmode=true&profileId=pfl_mock', 200, paymentsPage).twice();

    // Passing `undefined` is type-valid (the parameter is optional) and must inject just like `{}` ‒ not be dropped.
    const payments = await bluster(mollieClient.payments.page.bind(mollieClient.payments))(undefined);

    expect(payments.length).toBe(1);
  });
});

test('treats an explicit undefined parameters argument the same as {} for id-methods', () => {
  return new NetworkMocker(clientWith({ testmode: true, profileId: 'pfl_mock' })).use(async ([mollieClient, networkMocker]) => {
    // payments.get accepts testmode (not profileId), so only testmode is injected into the query.
    networkMocker.intercept('GET', '/payments/tr_mock0001?testmode=true', 200, payment).twice();

    const result = await bluster(mollieClient.payments.get.bind(mollieClient.payments))('tr_mock0001', undefined);

    expect(result.id).toBe('tr_mock0001');
  });
});

test('injects the client defaults into the request body', () => {
  return new NetworkMocker(clientWith({ testmode: true, profileId: 'pfl_mock' })).use(async ([mollieClient, networkMocker]) => {
    let capturedBody: any;
    networkMocker
      .spy('POST', '/payments', body => {
        capturedBody = body;
        return [201, payment];
      })
      .twice();

    await bluster(mollieClient.payments.create.bind(mollieClient.payments))({ amount: { value: '10.00', currency: 'EUR' }, description: 'A payment' });

    expect(capturedBody.testmode).toBe(true);
    expect(capturedBody.profileId).toBe('pfl_mock');
  });
});

test('lets a per-call value take precedence over the default (including a literal false)', () => {
  return new NetworkMocker(clientWith({ testmode: true, profileId: 'pfl_default' })).use(async ([mollieClient, networkMocker]) => {
    // testmode comes from the call (false, not the default true); profileId is still filled from the default.
    networkMocker.intercept('GET', '/payments?testmode=false&profileId=pfl_default', 200, paymentsPage).twice();

    const payments = await bluster(mollieClient.payments.page.bind(mollieClient.payments))({ testmode: false });

    expect(payments.length).toBe(1);
  });
});

test('does not inject anything when no parameterDefaults are configured', () => {
  return new NetworkMocker(clientWith()).use(async ([mollieClient, networkMocker]) => {
    // Interceptor matches the bare path ‒ would fail if a default were injected.
    networkMocker.intercept('GET', '/payments', 200, paymentsPage).twice();

    const payments = await bluster(mollieClient.payments.page.bind(mollieClient.payments))({});

    expect(payments.length).toBe(1);
  });
});

test('injects through aliased methods (wrapping runs before alias)', () => {
  return new NetworkMocker(clientWith({ testmode: true, profileId: 'pfl_mock' })).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/payments?testmode=true&profileId=pfl_mock', 200, paymentsPage).twice();

    // `list` is an alias of `page`; it must resolve to the wrapped method.
    const payments = await bluster(mollieClient.payments.list.bind(mollieClient.payments))({});

    expect(payments.length).toBe(1);
  });
});

test('injects only the keys a method actually accepts', () => {
  return new NetworkMocker(clientWith({ testmode: true, profileId: 'pfl_mock' })).use(async ([mollieClient, networkMocker]) => {
    // terminals.get accepts testmode but not profileId, so only testmode is injected (no profileId in the query).
    networkMocker
      .intercept('GET', '/terminals/term_mock0001?testmode=true', 200, {
        resource: 'terminal',
        id: 'term_mock0001',
        status: 'active',
        mode: 'test',
        description: 'A terminal',
        createdAt: '2024-01-01T00:00:00+00:00',
        updatedAt: '2024-01-01T00:00:00+00:00',
        _links: { self: { href: 'https://api.mollie.com/v2/terminals/term_mock0001', type: 'application/hal+json' } },
      })
      .twice();

    const terminal = await bluster(mollieClient.terminals.get.bind(mollieClient.terminals))('term_mock0001');

    expect(terminal.id).toBe('term_mock0001');
  });
});
