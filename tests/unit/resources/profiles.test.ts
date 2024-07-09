import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

test('getProfile', async () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider());
  const mollieClient = await networkMocker.prepare();

  await Promise.all(
    (
      [
        ['/profiles/pfl_ahe8z8OPut', bluster(mollieClient.profiles.get.bind(mollieClient.profiles)).bind(undefined, 'pfl_ahe8z8OPut')],
        ['/profiles/me', bluster(mollieClient.profiles.getCurrent.bind(mollieClient.profiles))],
      ] as [string, () => Promise<any>][]
    ).map(async ([url, get]) => {
      networkMocker.intercept('GET', url, 200, {
        resource: 'profile',
        id: 'pfl_ahe8z8OPut',
        mode: 'live',
        name: 'My website name',
        website: 'http://www.mywebsite.com',
        email: 'info@mywebsite.com',
        phone: '31123456789',
        categoryCode: 5399,
        status: 'verified',
        review: {
          status: 'pending',
        },
        createdAt: '2016-01-11T13:03:55+00:00',
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/profiles/pfl_ahe8z8OPut',
            type: 'application/hal+json',
          },
          chargebacks: {
            href: 'https://api.mollie.com/v2/chargebacks?profileId=pfl_ahe8z8OPut',
            type: 'application/hal+json',
          },
          methods: {
            href: 'https://api.mollie.com/v2/methods?profileId=pfl_ahe8z8OPut',
            type: 'application/hal+json',
          },
          payments: {
            href: 'https://api.mollie.com/v2/payments?profileId=pfl_ahe8z8OPut',
            type: 'application/hal+json',
          },
          refunds: {
            href: 'https://api.mollie.com/v2/refunds?profileId=pfl_ahe8z8OPut',
            type: 'application/hal+json',
          },
          checkoutPreviewUrl: {
            href: 'https://www.mollie.com/payscreen/preview/pfl_ahe8z8OPut',
            type: 'text/html',
          },
        },
      }).twice();

      const profile = await get();

      expect(profile.id).toBe('pfl_ahe8z8OPut');
      expect(profile.mode).toBe('live');
      expect(profile.name).toBe('My website name');
      expect(profile.website).toBe('http://www.mywebsite.com');
      expect(profile.email).toBe('info@mywebsite.com');
      expect(profile.phone).toBe('31123456789');
      expect(profile.categoryCode).toBe(5399);
      expect(profile.status).toBe('verified');
      expect(profile.review).toEqual({ status: 'pending' });

      expect(profile._links.self).toEqual({ href: 'https://api.mollie.com/v2/profiles/pfl_ahe8z8OPut', type: 'application/hal+json' });

      expect(profile._links.chargebacks).toEqual({ href: 'https://api.mollie.com/v2/chargebacks?profileId=pfl_ahe8z8OPut', type: 'application/hal+json' });

      expect(profile._links.methods).toEqual({ href: 'https://api.mollie.com/v2/methods?profileId=pfl_ahe8z8OPut', type: 'application/hal+json' });

      expect(profile._links.payments).toEqual({ href: 'https://api.mollie.com/v2/payments?profileId=pfl_ahe8z8OPut', type: 'application/hal+json' });

      expect(profile._links.refunds).toEqual({ href: 'https://api.mollie.com/v2/refunds?profileId=pfl_ahe8z8OPut', type: 'application/hal+json' });

      expect(profile._links.checkoutPreviewUrl).toEqual({ href: 'https://www.mollie.com/payscreen/preview/pfl_ahe8z8OPut', type: 'text/html' });
    }),
  );
});

test('listProfiles', async () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider());
  const mollieClient = await networkMocker.prepare();

  networkMocker.intercept('GET', '/profiles', 200, {
    _embedded: {
      profiles: [
        {
          resource: 'profile',
          id: 'pfl_ahe8z8OPut',
          mode: 'live',
          name: 'My website name',
          website: 'http://www.mywebsite.com',
          email: 'info@mywebsite.com',
          phone: '31123456789',
          categoryCode: 5399,
          status: 'verified',
          review: {
            status: 'pending',
          },
          createdAt: '2016-01-11T13:03:55+00:00',
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/profiles/pfl_ahe8z8OPut',
              type: 'application/hal+json',
            },
            chargebacks: {
              href: 'https://api.mollie.com/v2/chargebacks?profileId=pfl_ahe8z8OPut',
              type: 'application/hal+json',
            },
            methods: {
              href: 'https://api.mollie.com/v2/methods?profileId=pfl_ahe8z8OPut',
              type: 'application/hal+json',
            },
            payments: {
              href: 'https://api.mollie.com/v2/payments?profileId=pfl_ahe8z8OPut',
              type: 'application/hal+json',
            },
            refunds: {
              href: 'https://api.mollie.com/v2/refunds?profileId=pfl_ahe8z8OPut',
              type: 'application/hal+json',
            },
            checkoutPreviewUrl: {
              href: 'https://www.mollie.com/payscreen/preview/pfl_ahe8z8OPut',
              type: 'text/html',
            },
          },
        },
        {
          resource: 'profile',
          id: 'pfl_znNaTRkJs5',
          mode: 'live',
          name: 'My website name 2',
          website: 'http://www.mywebsite2.com',
          email: 'info@mywebsite2.com',
          phone: '31123456789',
          categoryCode: 5399,
          status: 'verified',
          review: {
            status: 'pending',
          },
          createdAt: '2016-01-11T13:03:55+00:00',
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/profiles/pfl_znNaTRkJs5',
              type: 'application/hal+json',
            },
            chargebacks: {
              href: 'https://api.mollie.com/v2/chargebacks?profileId=pfl_znNaTRkJs5',
              type: 'application/hal+json',
            },
            methods: {
              href: 'https://api.mollie.com/v2/methods?profileId=pfl_znNaTRkJs5',
              type: 'application/hal+json',
            },
            payments: {
              href: 'https://api.mollie.com/v2/payments?profileId=pfl_znNaTRkJs5',
              type: 'application/hal+json',
            },
            refunds: {
              href: 'https://api.mollie.com/v2/refunds?profileId=pfl_znNaTRkJs5',
              type: 'application/hal+json',
            },
            checkoutPreviewUrl: {
              href: 'https://www.mollie.com/payscreen/preview/pfl_znNaTRkJs5',
              type: 'text/html',
            },
          },
        },
      ],
    },
    count: 2,
    _links: {
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/profiles-api/list-profiles',
        type: 'text/html',
      },
      self: {
        href: 'https://api.mollie.nl/v2/profiles?limit=50',
        type: 'application/hal+json',
      },
      previous: null,
      next: null,
    },
  }).twice();

  const profiles = await bluster(mollieClient.profiles.page.bind(mollieClient.profiles))();

  expect(profiles.length).toBe(2);

  expect(profiles.links.self).toEqual({ href: 'https://api.mollie.nl/v2/profiles?limit=50', type: 'application/hal+json' });

  expect(profiles.links.documentation).toEqual({ href: 'https://docs.mollie.com/reference/v2/profiles-api/list-profiles', type: 'text/html' });
});

test('updateProfile', async () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider());
  const mollieClient = await networkMocker.prepare();

  const expectedWebsiteName = 'Mollie';
  const expectedEmail = 'mollie@mollie.com';
  const expectedPhone = '31123456766';

  networkMocker.intercept('PATCH', '/profiles/pfl_ahe8z8OPut', 200, {
    resource: 'profile',
    id: 'pfl_ahe8z8OPut',
    mode: 'live',
    name: expectedWebsiteName,
    website: 'http://www.mywebsite.com',
    email: expectedEmail,
    phone: expectedPhone,
    categoryCode: 5399,
    status: 'verified',
    review: {
      status: 'pending',
    },
    createdAt: '2016-01-11T13:03:55+00:00',
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/profiles/pfl_ahe8z8OPut',
        type: 'application/hal+json',
      },
      chargebacks: {
        href: 'https://api.mollie.com/v2/chargebacks?profileId=pfl_ahe8z8OPut',
        type: 'application/hal+json',
      },
      methods: {
        href: 'https://api.mollie.com/v2/methods?profileId=pfl_ahe8z8OPut',
        type: 'application/hal+json',
      },
      payments: {
        href: 'https://api.mollie.com/v2/payments?profileId=pfl_ahe8z8OPut',
        type: 'application/hal+json',
      },
      refunds: {
        href: 'https://api.mollie.com/v2/refunds?profileId=pfl_ahe8z8OPut',
        type: 'application/hal+json',
      },
      checkoutPreviewUrl: {
        href: 'https://www.mollie.com/payscreen/preview/pfl_ahe8z8OPut',
        type: 'text/html',
      },
    },
  }).twice();

  const profile = await bluster(mollieClient.profiles.update.bind(mollieClient.profiles))('pfl_ahe8z8OPut', { name: expectedWebsiteName, email: expectedEmail, phone: expectedPhone });

  expect(profile.name).toBe(expectedWebsiteName);
  expect(profile.email).toBe(expectedEmail);
  expect(profile.phone).toBe(expectedPhone);
});
