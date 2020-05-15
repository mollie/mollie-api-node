import wireMockClient from '../../wireMockClient';
import { Onboarding } from '../../..';

async function getOnboarding(status) {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/onboarding/me').reply(200, {
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
  });

  return await bluster(client.onboarding.get.bind(client.onboarding))();
}

test('onboardingStatuses', () => {
  return Promise.all(
    [
      ['needs-data', 'needsData', true],
      ['needs-data', 'isInReview', false],
      ['needs-data', 'isCompleted', false],

      ['in-review', 'needsData', false],
      ['in-review', 'isInReview', true],
      ['in-review', 'isCompleted', false],

      ['completed', 'needsData', false],
      ['completed', 'isInReview', false],
      ['completed', 'isCompleted', true],
    ].map(async ([status, method, expectedResult]) => {
      const onboarding = await getOnboarding(status);

      expect(onboarding[method as keyof Onboarding]()).toBe(expectedResult);
    }),
  );
});
