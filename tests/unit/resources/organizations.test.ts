import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

const response = {
  resource: 'organization',
  id: 'org_12345678',
  name: 'Mollie B.V.',
  email: 'info@mollie.com',
  locale: 'nl_NL',
  address: {
    streetAndNumber: 'Keizersgracht 313',
    postalCode: '1016 EE',
    city: 'Amsterdam',
    country: 'NL',
  },
  registrationNumber: '30204462',
  vatNumber: 'NL815839091B01',
  _links: {
    self: {
      href: 'https://api.mollie.com/v2/organizations/org_12345678',
      type: 'application/hal+json',
    },
    documentation: {
      href: 'https://docs.mollie.com/reference/v2/organizations-api/get-organization',
      type: 'text/html',
    },
  },
};

function testOrganization(organization) {
  expect(organization.id).toBe('org_12345678');
  expect(organization.name).toBe('Mollie B.V.');
  expect(organization.email).toBe('info@mollie.com');
  expect(organization.locale).toBe('nl_NL');
  expect(organization.address).toEqual({
    streetAndNumber: 'Keizersgracht 313',
    postalCode: '1016 EE',
    city: 'Amsterdam',
    country: 'NL',
  });
  expect(organization.registrationNumber).toBe('30204462');
  expect(organization.vatNumber).toBe('NL815839091B01');
  expect(organization._links.self).toEqual({
    href: 'https://api.mollie.com/v2/organizations/org_12345678',
    type: 'application/hal+json',
  });
  expect(organization._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/organizations-api/get-organization',
    type: 'text/html',
  });
}

test('getOrganization', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/organizations/org_12345678', 200, response).twice();

    const organization = await bluster(mollieClient.organizations.get.bind(mollieClient.organizations))('org_12345678');

    testOrganization(organization);
  });
});

test('getCurrentOrganization', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/organizations/me', 200, response).twice();

    const organization = await bluster(mollieClient.organizations.getCurrent.bind(mollieClient.organizations))();

    testOrganization(organization);
  });
});

test('getPartnerStatus', () => {
  const partnerStatusResponse = {
    resource: 'partner',
    partnerType: 'signuplink',
    isCommissionPartner: true,
    partnerContractSignedAt: '2024-03-20T13:59:02.0Z',
    partnerContractUpdateAvailable: false,
    partnerContractExpiresAt: '2024-04-19T23:59:59.0Z',
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/organizations/me/partner',
        type: 'application/hal+json',
      },
      signuplink: {
        href: 'https://www.mollie.com/dashboard/signup/exampleCode',
        type: 'text/html',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/get-partner-status',
        type: 'text/html',
      },
    },
  };

  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/organizations/me/partner', 200, partnerStatusResponse).twice();

    const partnerStatus = await bluster(mollieClient.organizations.getPartnerStatus.bind(mollieClient.organizations))();

    expect(partnerStatus.resource).toBe('partner');
    expect(partnerStatus.partnerType).toBe('signuplink');
    expect(partnerStatus.isCommissionPartner).toBe(true);
    expect(partnerStatus.partnerContractSignedAt).toBe('2024-03-20T13:59:02.0Z');
    expect(partnerStatus.partnerContractUpdateAvailable).toBe(false);
    expect(partnerStatus.partnerContractExpiresAt).toBe('2024-04-19T23:59:59.0Z');
    expect(partnerStatus._links.self).toEqual({
      href: 'https://api.mollie.com/v2/organizations/me/partner',
      type: 'application/hal+json',
    });
    expect(partnerStatus._links.signuplink).toEqual({
      href: 'https://www.mollie.com/dashboard/signup/exampleCode',
      type: 'text/html',
    });
  });
});
