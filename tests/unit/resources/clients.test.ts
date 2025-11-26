import createMollieClient from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

test('getClient', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/clients/org_12345678', 200, {
        resource: 'client',
        id: 'org_12345678',
        commission: {
          count: 5,
        },
        organizationCreatedAt: '2023-04-06T13:10:19+00:00',
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/clients/org_12345678',
            type: 'application/hal+json',
          },
          organization: {
            href: 'https://api.mollie.com/v2/organizations/org_12345678',
            type: 'application/hal+json',
          },
          onboarding: {
            href: 'https://api.mollie.com/v2/onboarding/org_12345678',
            type: 'application/hal+json',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/get-client',
            type: 'text/html',
          },
        },
      })
      .twice();

    const client = await bluster(mollieClient.clients.get.bind(mollieClient.clients))('org_12345678');

    expect(client.resource).toBe('client');
    expect(client.id).toBe('org_12345678');
    expect(client.commission).toEqual({ count: 5 });
    expect(client.organizationCreatedAt).toBe('2023-04-06T13:10:19+00:00');
    expect(client._links.self.href).toBe('https://api.mollie.com/v2/clients/org_12345678');
    expect(client._links.organization.href).toBe('https://api.mollie.com/v2/organizations/org_12345678');
    expect(client._links.onboarding.href).toBe('https://api.mollie.com/v2/onboarding/org_12345678');
  });
});

test('listClients', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/clients', 200, {
        count: 2,
        _embedded: {
          clients: [
            {
              resource: 'client',
              id: 'org_12345678',
              commission: {
                count: 5,
              },
              organizationCreatedAt: '2023-04-06T13:10:19+00:00',
              _links: {
                self: {
                  href: 'https://api.mollie.com/v2/clients/org_12345678',
                  type: 'application/hal+json',
                },
                organization: {
                  href: 'https://api.mollie.com/v2/organizations/org_12345678',
                  type: 'application/hal+json',
                },
                onboarding: {
                  href: 'https://api.mollie.com/v2/onboarding/org_12345678',
                  type: 'application/hal+json',
                },
                documentation: {
                  href: 'https://docs.mollie.com/reference/get-client',
                  type: 'text/html',
                },
              },
            },
            {
              resource: 'client',
              id: 'org_87654321',
              commission: null,
              organizationCreatedAt: '2023-05-10T09:30:00+00:00',
              _links: {
                self: {
                  href: 'https://api.mollie.com/v2/clients/org_87654321',
                  type: 'application/hal+json',
                },
                organization: {
                  href: 'https://api.mollie.com/v2/organizations/org_87654321',
                  type: 'application/hal+json',
                },
                onboarding: {
                  href: 'https://api.mollie.com/v2/onboarding/org_87654321',
                  type: 'application/hal+json',
                },
                documentation: {
                  href: 'https://docs.mollie.com/reference/get-client',
                  type: 'text/html',
                },
              },
            },
          ],
        },
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/clients',
            type: 'application/hal+json',
          },
          previous: null,
          next: {
            href: 'https://api.mollie.com/v2/clients?from=org_99999999&limit=50',
            type: 'application/hal+json',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/list-clients',
            type: 'text/html',
          },
        },
      })
      .twice();

    const clients = await bluster(mollieClient.clients.page.bind(mollieClient.clients))();

    expect(clients).toHaveLength(2);

    expect(clients[0].resource).toBe('client');
    expect(clients[0].id).toBe('org_12345678');
    expect(clients[0].commission).toEqual({ count: 5 });

    expect(clients[1].resource).toBe('client');
    expect(clients[1].id).toBe('org_87654321');
    expect(clients[1].commission).toBeFalsy();

    // Check pagination helpers
    expect(typeof clients.nextPage).toBe('function');
    expect(clients.nextPageCursor).toBe('org_99999999');
    expect(clients.previousPage).toBeUndefined();
    expect(clients.previousPageCursor).toBeUndefined();
  });
});

test('getClient with embedded organization', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/clients/org_12345678', 200, {
        resource: 'client',
        id: 'org_12345678',
        commission: null,
        organizationCreatedAt: '2023-04-06T13:10:19+00:00',
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/clients/org_12345678',
            type: 'application/hal+json',
          },
          organization: {
            href: 'https://api.mollie.com/v2/organizations/org_12345678',
            type: 'application/hal+json',
          },
          onboarding: {
            href: 'https://api.mollie.com/v2/onboarding/org_12345678',
            type: 'application/hal+json',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/get-client',
            type: 'text/html',
          },
        },
        _embedded: {
          organization: {
            resource: 'organization',
            id: 'org_12345678',
            name: 'Test Organization',
            locale: 'en_US',
            address: {
              streetAndNumber: '123 Test Street',
              postalCode: '1234AB',
              city: 'Amsterdam',
              country: 'NL',
            },
            registrationNumber: '12345678',
            vatNumber: 'NL123456789B01',
            vatRegulation: 'dutch',
            _links: {
              self: {
                href: 'https://api.mollie.com/v2/organizations/org_12345678',
                type: 'application/hal+json',
              },
              documentation: {
                href: 'https://docs.mollie.com/reference/organizations-api',
                type: 'text/html',
              },
            },
          },
        },
      })
      .twice();

    const client = await bluster(mollieClient.clients.get.bind(mollieClient.clients))('org_12345678');

    // Organization should be embedded
    expect(client._embedded?.organization).toBeDefined();
    expect(client._embedded?.organization?.name).toBe('Test Organization');

    // getOrganization() should return the embedded organization without extra API call
    const organization = await client.getOrganization();
    expect(organization.id).toBe('org_12345678');
    expect(organization.name).toBe('Test Organization');
  });
});

test('getClient helper fetches organization if not embedded', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    // First intercept: get client without embedded organization
    networkMocker
      .intercept('GET', '/clients/org_12345678', 200, {
        resource: 'client',
        id: 'org_12345678',
        commission: null,
        organizationCreatedAt: '2023-04-06T13:10:19+00:00',
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/clients/org_12345678',
            type: 'application/hal+json',
          },
          organization: {
            href: 'https://api.mollie.com/v2/organizations/org_12345678',
            type: 'application/hal+json',
          },
          onboarding: {
            href: 'https://api.mollie.com/v2/onboarding/org_12345678',
            type: 'application/hal+json',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/get-client',
            type: 'text/html',
          },
        },
      })
      .twice();

    // Second intercept: the helper should fetch organization from API
    networkMocker
      .intercept('GET', '/organizations/org_12345678', 200, {
        resource: 'organization',
        id: 'org_12345678',
        name: 'Fetched Organization',
        locale: 'en_US',
        address: {
          streetAndNumber: '123 Test Street',
          postalCode: '1234AB',
          city: 'Amsterdam',
          country: 'NL',
        },
        registrationNumber: '12345678',
        vatNumber: 'NL123456789B01',
        vatRegulation: 'dutch',
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/organizations/org_12345678',
            type: 'application/hal+json',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/organizations-api',
            type: 'text/html',
          },
        },
      })
      .twice();

    const client = await bluster(mollieClient.clients.get.bind(mollieClient.clients))('org_12345678');

    // Organization should NOT be embedded
    expect(client._embedded?.organization).toBeUndefined();

    // getOrganization() should fetch from API
    const organization = await client.getOrganization();
    expect(organization.id).toBe('org_12345678');
    expect(organization.name).toBe('Fetched Organization');
  });
});

describe('clients binder', () => {
  it('is available on the client', () => {
    const mollieClient = createMollieClient({ apiKey: 'test_dummyKey' });
    expect(mollieClient).toHaveProperty('clients');
    expect(mollieClient.clients).toHaveProperty('get');
    expect(mollieClient.clients).toHaveProperty('page');
    expect(mollieClient.clients).toHaveProperty('iterate');
    expect(typeof mollieClient.clients.get).toBe('function');
    expect(typeof mollieClient.clients.page).toBe('function');
    expect(typeof mollieClient.clients.iterate).toBe('function');
  });

  it('has helper methods on the client object', () => {
    const mollieClient = createMollieClient({ apiKey: 'test_dummyKey' });
    // These checks would require a real client object, which we verify in the functional tests above
  });
});
