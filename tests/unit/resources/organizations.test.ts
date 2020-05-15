import wireMockClient from '../../wireMockClient';

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

test('getOrganization', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/organizations/org_12345678').reply(200, response);

  const organization = await bluster(client.organizations.get.bind(client.organizations))('org_12345678');

  testOrganization(organization);
});

test('getCurrentOrganization', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/organizations/me').reply(200, response);

  const organization = await bluster(client.organizations.getCurrent.bind(client.organizations))();

  testOrganization(organization);
});
