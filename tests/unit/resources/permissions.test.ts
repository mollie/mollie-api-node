import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

function testPermission(permission, id) {
  expect(permission.resource).toBe('permission');
  expect(permission.id).toBe(id);
  expect(permission.description).toBe('Some dummy permission description');
  expect(permission.granted).toBe(true);

  expect(permission._links.self).toEqual({ href: `https://api.mollie.com/v2/permissions/${id}`, type: 'application/hal+json' });

  expect(permission._links.documentation).toEqual({ href: 'https://docs.mollie.com/reference/v2/permissions-api/get-permission', type: 'text/html' });
}

test('getPermissions', async () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider());
  const mollieClient = await networkMocker.prepare();

  await Promise.all(
    [
      'payments.read',
      'payments.write',
      'refunds.read',
      'refunds.write',
      'customers.read',
      'customers.write',
      'mandates.read',
      'mandates.write',
      'subscriptions.read',
      'subscriptions.write',
      'profiles.read',
      'profiles.write',
      'invoices.read',
      'invoices.write',
      'settlements.read',
      'settlements.write',
      'orders.read',
      'orders.write',
      'organizations.read',
      'organizations.write',
    ].map(async id => {
      networkMocker.intercept('GET', `/permissions/${id}`, 200, {
        resource: 'permission',
        id,
        description: 'Some dummy permission description',
        granted: true,
        _links: {
          self: {
            href: `https://api.mollie.com/v2/permissions/${id}`,
            type: 'application/hal+json',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/v2/permissions-api/get-permission',
            type: 'text/html',
          },
        },
      }).twice();

      const permission = await bluster(mollieClient.permissions.get.bind(mollieClient.permissions))(id);

      testPermission(permission, id);
    }),
  );
});

test('listPermissions', async () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider());
  const mollieClient = await networkMocker.prepare();

  networkMocker.intercept('GET', '/permissions', 200, {
    _embedded: {
      permissions: [
        {
          resource: 'permission',
          id: 'payments.write',
          description: 'Some dummy permission description',
          granted: true,
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/permissions/payments.write',
              type: 'application/hal+json',
            },
            documentation: {
              href: 'https://docs.mollie.com/reference/v2/permissions-api/get-permission',
              type: 'text/html',
            },
          },
        },
        {
          resource: 'permission',
          id: 'payments.read',
          description: 'Some dummy permission description',
          granted: true,
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/permissions/payments.read',
              type: 'application/hal+json',
            },
            documentation: {
              href: 'https://docs.mollie.com/reference/v2/permissions-api/get-permission',
              type: 'text/html',
            },
          },
        },
      ],
    },
    count: 2,
    _links: {
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/permissions-api/list-permissions',
        type: 'text/html',
      },
      self: {
        href: 'https://api.mollie.com/v2/permissions',
        type: 'application/hal+json',
      },
    },
  }).twice();

  const permissions = await bluster(mollieClient.permissions.list.bind(mollieClient.permissions))();

  expect(permissions.length).toBe(2);

  testPermission(permissions[0], 'payments.write');
  testPermission(permissions[1], 'payments.read');
});
