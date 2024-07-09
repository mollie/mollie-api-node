import NetworkMocker, { getApiKeyClientProvider } from '../../../NetworkMocker';

test('createCustomerMandate', async () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider());
  const mollieClient = await networkMocker.prepare();

  networkMocker.intercept('POST', '/customers/cst_FhQJRw4s2n/mandates', 200, {
    resource: 'mandate',
    id: 'mdt_AcQl5fdL4h',
    status: 'valid',
    method: 'directdebit',
    details: {
      consumerName: 'John Doe',
      consumerAccount: 'NL55INGB0000000000',
      consumerBic: 'INGBNL2A',
    },
    mandateReference: null,
    signatureDate: '2018-05-07',
    createdAt: '2018-05-07T10:49:08+00:00',
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/mandates/mdt_AcQl5fdL4h',
        type: 'application/hal+json',
      },
      customer: {
        href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://mollie.com/en/docs/reference/customers/create-mandate',
        type: 'text/html',
      },
    },
  }).twice();

  const mandate = await bluster(mollieClient.customerMandates.create.bind(mollieClient.customerMandates))({
    customerId: 'cst_FhQJRw4s2n',
    consumerName: 'John Doe',
    method: 'directdebit',
    consumerBic: 'INGBNL2A',
    consumerAccount: 'NL55INGB0000000000',
  });

  expect(mandate.resource).toBe('mandate');
  expect(mandate.status).toBe('valid');
  expect(mandate.details).toEqual({ consumerName: 'John Doe', consumerAccount: 'NL55INGB0000000000', consumerBic: 'INGBNL2A' });
  expect(mandate.mandateReference).toBeNull();
  expect(mandate.signatureDate).toBe('2018-05-07');
  expect(mandate.createdAt).toBe('2018-05-07T10:49:08+00:00');

  expect(mandate._links.self).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/mandates/mdt_AcQl5fdL4h', type: 'application/hal+json' });

  expect(mandate._links.customer).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n', type: 'application/hal+json' });

  expect(mandate._links.documentation).toEqual({ href: 'https://mollie.com/en/docs/reference/customers/create-mandate', type: 'text/html' });
});

test('getCustomerMandate', async () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider());
  const mollieClient = await networkMocker.prepare();

  networkMocker.intercept('GET', '/customers/cst_FhQJRw4s2n/mandates/mdt_AcQl5fdL4h', 200, {
    resource: 'mandate',
    id: 'mdt_AcQl5fdL4h',
    status: 'valid',
    method: 'directdebit',
    details: {
      consumerName: 'John Doe',
      consumerAccount: 'NL55INGB0000000000',
      consumerBic: 'INGBNL2A',
    },
    mandateReference: null,
    signatureDate: '2018-05-07',
    createdAt: '2018-05-07T10:49:08+00:00',
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/mandates/mdt_AcQl5fdL4h',
        type: 'application/hal+json',
      },
      customer: {
        href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://mollie.com/en/docs/reference/customers/create-mandate',
        type: 'text/html',
      },
    },
  }).twice();

  const mandate = await bluster(mollieClient.customerMandates.get.bind(mollieClient.customerMandates))('mdt_AcQl5fdL4h', { customerId: 'cst_FhQJRw4s2n' });

  expect(mandate.resource).toBe('mandate');
  expect(mandate.status).toBe('valid');
  expect(mandate.method).toBe('directdebit');
  expect(mandate.details).toEqual({ consumerName: 'John Doe', consumerAccount: 'NL55INGB0000000000', consumerBic: 'INGBNL2A' });
  expect(mandate.mandateReference).toBeNull();
  expect(mandate.signatureDate).toBe('2018-05-07');
  expect(mandate.createdAt).toBe('2018-05-07T10:49:08+00:00');

  expect(mandate._links.self).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/mandates/mdt_AcQl5fdL4h', type: 'application/hal+json' });

  expect(mandate._links.customer).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n', type: 'application/hal+json' });

  expect(mandate._links.documentation).toEqual({ href: 'https://mollie.com/en/docs/reference/customers/create-mandate', type: 'text/html' });
});

test('getCustomerMandates', async () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider());
  const mollieClient = await networkMocker.prepare();

  networkMocker.intercept('GET', '/customers/cst_FhQJRw4s2n/mandates', 200, {
    _embedded: {
      mandates: [
        {
          resource: 'mandate',
          id: 'mdt_AcQl5fdL4h',
          status: 'valid',
          method: 'directdebit',
          details: {
            consumerName: 'John Doe',
            consumerAccount: 'NL55INGB0000000000',
            consumerBic: 'INGBNL2A',
          },
          mandateReference: null,
          signatureDate: '2018-05-07',
          createdAt: '2018-05-07T10:49:08+00:00',
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n/mandates/mdt_AcQl5fdL4h',
              type: 'application/hal+json',
            },
            customer: {
              href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n',
              type: 'application/hal+json',
            },
          },
        },
      ],
    },
    count: 1,
    _links: {
      documentation: {
        href: 'https://mollie.com/en/docs/reference/customers/list-mandates',
        type: 'text/html',
      },
      self: {
        href: 'https://api.mollie.com/v2/customers/cst_vzEExMcxj7/mandates?limit=50',
        type: 'application/hal+json',
      },
      previous: null,
      next: null,
    },
  }).twice();

  const mandates = await bluster(mollieClient.customerMandates.page.bind(mollieClient.customerMandates))({ customerId: 'cst_FhQJRw4s2n' });

  mandates.forEach(mandate => {
    expect(mandate.resource).toBe('mandate');
    expect(mandate.status).toBe('valid');

    expect(mandate._links.customer).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_FhQJRw4s2n', type: 'application/hal+json' });
  });

  expect(mandates.links.self).toEqual({ href: 'https://api.mollie.com/v2/customers/cst_vzEExMcxj7/mandates?limit=50', type: 'application/hal+json' });

  expect(mandates.links.documentation).toEqual({ href: 'https://mollie.com/en/docs/reference/customers/list-mandates', type: 'text/html' });
});
