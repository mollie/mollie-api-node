import { apply } from 'ruply';
import createMollieClient, { MethodInclude } from '../..';
import NetworkMocker, { getApiKeyClientProvider } from '../NetworkMocker';

test('queryString', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/methods?include=issuers%2Cpricing&amount%5Bvalue%5D=10.00&amount%5Bcurrency%5D=SEK', 200, {
        _embedded: {
          methods: [],
        },
        count: 0,
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/v2/methods-api/list-methods',
            type: 'text/html',
          },
          self: {
            href: 'https://api.mollie.com/v2/methods?include=issuers%2Cpricing&amount%5Bvalue%5D=10.00&amount%5Bcurrency%5D=SEK',
            type: 'application/hal+json',
          },
        },
      })
      .twice();

    const methods = await bluster(mollieClient.methods.list.bind(mollieClient.methods))({
      include: [MethodInclude.issuers, MethodInclude.pricing],
      amount: {
        value: '10.00',
        currency: 'SEK',
      },
    });

    expect(methods.length).toBe(0);
  });
});

test('defaults', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    let actualHeaders: Record<string, Array<string>> | undefined = undefined;

    networkMocker
      .spy('GET', '/customers', (_, headers) =>
        apply(
          [
            200,
            {
              _embedded: {
                customers: [],
              },
              count: 0,
              _links: {
                documentation: {
                  href: 'https://docs.mollie.com/reference/v2/customers-api/list-customers',
                  type: 'text/html',
                },
                self: {
                  href: 'https://api.mollie.com/v2/customers?limit=50',
                  type: 'application/hal+json',
                },
                previous: null,
                next: null,
              },
            },
          ],
          () => (actualHeaders = headers),
        ),
      )
      .twice();

    await bluster(mollieClient.customers.page.bind(mollieClient.customers))();

    // Test previously named "it should have some default headers set".
    apply(
      actualHeaders!!['authorization'],
      header => expect(header).toHaveLength(1),
      header => expect(header[0]).toBe('Bearer test_mock'),
    );
    apply(
      actualHeaders!!['user-agent'],
      header => expect(header).toHaveLength(1),
      header => expect(header[0]).toMatch(/^Node\/[v\d\.]+ Mollie\/[v\d\.]+(?:-[\w\.]+)?$/i),
    );
    apply(
      actualHeaders!!['accept-encoding'],
      header => expect(header).toHaveLength(1),
      header => expect(header[0]).toBe('gzip'),
    );
    apply(
      actualHeaders!!['content-type'],
      header => expect(header).toHaveLength(1),
      header => expect(header[0]).toBe('application/json'),
    );
  });
});

async function requestWithVersionStrings(versionStrings: string): Promise<Record<string, Array<string>>> {
  return new NetworkMocker(createMollieClient.bind(undefined, { apiKey: 'test_mock', versionStrings })).use(async ([mollieClient, networkMocker]) => {
    let actualHeaders: Record<string, Array<string>> | undefined = undefined;

    networkMocker
      .spy('GET', '/customers', (_, headers) =>
        apply(
          [
            200,
            {
              _embedded: {
                customers: [],
              },
              count: 0,
              _links: {
                documentation: {
                  href: 'https://docs.mollie.com/reference/v2/customers-api/list-customers',
                  type: 'text/html',
                },
                self: {
                  href: 'https://api.mollie.com/v2/customers?limit=50',
                  type: 'application/hal+json',
                },
                previous: null,
                next: null,
              },
            },
          ],
          () => (actualHeaders = headers),
        ),
      )
      .twice();

    await bluster(mollieClient.customers.page.bind(mollieClient.customers))();

    return actualHeaders;
  });
}

test('customVersionStrings', async () => {
  // Test previously named "it should add a version string".
  apply(
    (await requestWithVersionStrings('ReactionCommerce/1.16.0'))['user-agent'],
    header => expect(header).toHaveLength(1),
    header => expect(header[0].endsWith('ReactionCommerce/1.16.0')).toBeTruthy(),
  );

  // Test previously named "it should add a version string with whitespace".
  apply(
    (await requestWithVersionStrings('Reaction Commerce/1.16.0'))['user-agent'],
    header => expect(header).toHaveLength(1),
    header => expect(header[0].endsWith('ReactionCommerce/1.16.0')).toBeTruthy(),
  );

  // Test previously named "it should not camelCase all uppercase version strings".
  apply(
    (await requestWithVersionStrings('PHP/7.3.4'))['user-agent'],
    header => expect(header).toHaveLength(1),
    header => expect(header[0].endsWith('PHP/7.3.4')).toBeTruthy(),
  );

  // Test previously named "it should not camelCase all uppercase version strings with whitespace".
  apply(
    (await requestWithVersionStrings('PHP COOKBOOK FOR NODE USERS/7.3.4'))['user-agent'],
    header => expect(header).toHaveLength(1),
    header => expect(header[0].endsWith('PHPCOOKBOOKFORNODEUSERS/7.3.4')).toBeTruthy(),
  );

  apply(
    (await requestWithVersionStrings('php cookbook for node users/7.3.4'))['user-agent'],
    header => expect(header).toHaveLength(1),
    header => expect(header[0].endsWith('phpCookbookForNodeUsers/7.3.4')).toBeTruthy(),
  );
});

test('customApiEndpoint', () => {
  return new NetworkMocker(createMollieClient.bind(undefined, { apiKey: 'test_mock', apiEndpoint: 'https://null.house/' })).use(([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', { basePath: 'https://null.house', path: '/customers' }, 200, {
        _embedded: {
          customers: [],
        },
        count: 0,
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/v2/customers-api/list-customers',
            type: 'text/html',
          },
          self: {
            href: 'https://api.mollie.com/v2/customers?limit=50',
            type: 'application/hal+json',
          },
          previous: null,
          next: null,
        },
      })
      .twice();

    return bluster(mollieClient.customers.page.bind(mollieClient.customers))();
  });
});
