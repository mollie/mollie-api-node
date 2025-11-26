import createMollieClient from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

test('listCapabilities', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/capabilities', 200, {
        count: 2,
        _embedded: {
          capabilities: [
            {
              resource: 'capability',
              name: 'payments',
              status: 'enabled',
              requirements: [],
            },
            {
              resource: 'capability',
              name: 'settlements',
              status: 'pending',
              statusReason: 'onboarding-information-needed',
              requirements: [
                {
                  id: 'legal-representatives',
                  status: 'requested',
                  dueDate: null,
                  _links: {
                    dashboard: {
                      href: 'https://my.mollie.com/dashboard/...',
                      type: 'text/html',
                    },
                  },
                },
                {
                  id: 'bank-account',
                  status: 'past-due',
                  dueDate: '2024-05-14T01:29:09+00:00',
                  _links: {
                    dashboard: {
                      href: 'https://my.mollie.com/dashboard/...',
                      type: 'text/html',
                    },
                  },
                },
              ],
            },
          ],
        },
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/list-capabilities',
            type: 'text/html',
          },
        },
      })
      .twice();

    const capabilities = await bluster(mollieClient.capabilities.list.bind(mollieClient.capabilities))();

    expect(capabilities).toHaveLength(2);

    // First capability - enabled payments
    expect(capabilities[0].resource).toBe('capability');
    expect(capabilities[0].name).toBe('payments');
    expect(capabilities[0].status).toBe('enabled');
    expect(capabilities[0].statusReason).toBeUndefined();
    expect(capabilities[0].requirements).toHaveLength(0);

    // Second capability - pending settlements with requirements
    expect(capabilities[1].resource).toBe('capability');
    expect(capabilities[1].name).toBe('settlements');
    expect(capabilities[1].status).toBe('pending');
    expect(capabilities[1].statusReason).toBe('onboarding-information-needed');
    expect(capabilities[1].requirements).toHaveLength(2);

    // First requirement
    expect(capabilities[1].requirements[0].id).toBe('legal-representatives');
    expect(capabilities[1].requirements[0].status).toBe('requested');
    expect(capabilities[1].requirements[0].dueDate).toBeNull();
    expect(capabilities[1].requirements[0]._links.dashboard.href).toBe('https://my.mollie.com/dashboard/...');

    // Second requirement
    expect(capabilities[1].requirements[1].id).toBe('bank-account');
    expect(capabilities[1].requirements[1].status).toBe('past-due');
    expect(capabilities[1].requirements[1].dueDate).toBe('2024-05-14T01:29:09+00:00');
  });
});

describe('capabilities binder', () => {
  it('is available on the client', () => {
    const mollieClient = createMollieClient({ apiKey: 'test_dummyKey' });
    expect(mollieClient).toHaveProperty('capabilities');
    expect(mollieClient.capabilities).toHaveProperty('list');
    expect(typeof mollieClient.capabilities.list).toBe('function');
  });
});
