import { Onboarding } from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

function getOnboarding(status) {
  return new NetworkMocker(getApiKeyClientProvider()).use(([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/onboarding/me', 200, {
      resource: 'onboarding',
      name: 'Mollie B.V.',
      signedUpAt: '2018-12-20T10:49:08+00:00',
      status,
      canReceivePayments: true,
      canReceiveSettlements: true,
      _links: {
        self: {
          href: 'https://api.mollie.com/v2/onboarding/me',
          type: 'application/hal+json',
        },
        onboarding: {
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

    return bluster(mollieClient.onboarding.get.bind(mollieClient.onboarding))();
  });
}

test('onboardingStatuses', () => {
  return Promise.all(
    ['needs-data', 'in-review', 'completed'].map(async status => {
      const onboarding = await getOnboarding(status);

      expect(onboarding.status).toBe(status);
    }),
  );
});
