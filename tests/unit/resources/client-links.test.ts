import createMollieClient from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

test('createClientLink', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('POST', '/client-links', 201, {
        resource: 'client-link',
        id: 'cl_vZCnNQsV2UtfXxYifWKWH',
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/client-links/cl_vZCnNQsV2UtfXxYifWKWH',
            type: 'application/hal+json',
          },
          clientLink: {
            href: 'https://my.mollie.com/dashboard/client-link/cl_vZCnNQsV2UtfXxYifWKWH',
            type: 'text/html',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/create-client-link',
            type: 'text/html',
          },
        },
      })
      .twice();

    const clientLink = await bluster(mollieClient.clientLinks.create.bind(mollieClient.clientLinks))({
      owner: {
        email: 'info@example.org',
        givenName: 'John',
        familyName: 'Doe',
      },
      name: 'Mollie B.V.',
      address: {
        country: 'NL',
      },
      registrationNumber: '30204462',
      vatNumber: 'NL815839091B01',
    });

    expect(clientLink.resource).toBe('client-link');
    expect(clientLink.id).toBe('cl_vZCnNQsV2UtfXxYifWKWH');

    // Test helper method builds complete URL with query parameters
    const redirectUrl = clientLink.getClientLink({
      clientId: 'app_abc123',
      state: 'random_state_string',
      scope: 'onboarding.read onboarding.write',
    });
    expect(redirectUrl).toBe(
      'https://my.mollie.com/dashboard/client-link/cl_vZCnNQsV2UtfXxYifWKWH?client_id=app_abc123&state=random_state_string&scope=onboarding.read+onboarding.write',
    );

    // Test with optional approvalPrompt
    const redirectUrlWithPrompt = clientLink.getClientLink({
      clientId: 'app_abc123',
      state: 'random_state_string',
      scope: 'onboarding.read',
      approvalPrompt: 'force',
    });
    expect(redirectUrlWithPrompt).toContain('approval_prompt=force');
  });
});

test('createClientLink with full address', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('POST', '/client-links', 201, {
        resource: 'client-link',
        id: 'cl_fullAddress123',
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/client-links/cl_fullAddress123',
            type: 'application/hal+json',
          },
          clientLink: {
            href: 'https://my.mollie.com/dashboard/client-link/cl_fullAddress123',
            type: 'text/html',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/create-client-link',
            type: 'text/html',
          },
        },
      })
      .twice();

    const clientLink = await bluster(mollieClient.clientLinks.create.bind(mollieClient.clientLinks))({
      owner: {
        email: 'info@example.org',
        givenName: 'John',
        familyName: 'Doe',
        locale: 'nl_NL',
      },
      name: 'Test Organization',
      address: {
        streetAndNumber: 'Keizersgracht 126',
        postalCode: '1015CW',
        city: 'Amsterdam',
        country: 'NL',
      },
    });

    expect(clientLink.resource).toBe('client-link');
    expect(clientLink.id).toBe('cl_fullAddress123');
  });
});

describe('clientLinks binder', () => {
  it('is available on the client', () => {
    const mollieClient = createMollieClient({ apiKey: 'test_dummyKey' });
    expect(mollieClient).toHaveProperty('clientLinks');
    expect(mollieClient.clientLinks).toHaveProperty('create');
    expect(typeof mollieClient.clientLinks.create).toBe('function');
  });
});
