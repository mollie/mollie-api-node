import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

test('get', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/onboarding/me', 200, {
      resource: 'onboarding',
      name: 'Mollie B.V.',
      signedUpAt: '2018-12-20T10:49:08+00:00',
      status: 'completed',
      canReceivePayments: true,
      canReceiveSettlements: true,
      _links: {
        self: {
          href: 'https://api.mollie.com/v2/onboarding/me',
          type: 'application/hal+json',
        },
        dashboard: {
          href: 'https://www.mollie.com/dashboard/onboarding',
          type: 'text/html',
        },
        organization: {
          href: 'https://api.mollie.com/v2/organization/org_12345',
          type: 'application/hal+json',
        },
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status',
          type: 'text/html',
        },
      },
    }).twice();

    const onboarding = await bluster(mollieClient.onboarding.get.bind(mollieClient.onboarding))();

    expect(onboarding.resource).toBe('onboarding');
    expect(onboarding.name).toBe('Mollie B.V.');
    expect(onboarding.status).toBe('completed');
    expect(onboarding.signedUpAt).toBe('2018-12-20T10:49:08+00:00');
    expect(onboarding.canReceivePayments).toBe(true);
    expect(onboarding.canReceiveSettlements).toBe(true);

    expect(onboarding._links.self).toEqual({ href: 'https://api.mollie.com/v2/onboarding/me', type: 'application/hal+json' });

    expect(onboarding._links.dashboard).toEqual({ href: 'https://www.mollie.com/dashboard/onboarding', type: 'text/html' });

    expect(onboarding._links.organization).toEqual({ href: 'https://api.mollie.com/v2/organization/org_12345', type: 'application/hal+json' });

    expect(onboarding._links.documentation).toEqual({ href: 'https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status', type: 'text/html' });
  });
});

test('submit', () => {
  new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('POST', '/onboarding/me', 204).twice();

    const result = await bluster(mollieClient.onboarding.submit.bind(mollieClient.onboarding))();

    expect(result).toBe(true);
  });
});
