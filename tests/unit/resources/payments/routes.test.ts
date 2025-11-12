import NetworkMocker, { getApiKeyClientProvider } from '../../../NetworkMocker';

function composeRouteResponse(paymentId = 'tr_5B8cwPMGnU6qLbRvo7qEZo', routeId = 'crt_dyARQ3JzCgtPDhU2Pbq3J') {
  return {
    resource: 'route',
    id: routeId,
    paymentId: paymentId,
    amount: {
      value: '10.00',
      currency: 'EUR',
    },
    description: 'Payment for Order #12345',
    destination: {
      type: 'organization',
      organizationId: 'org_123',
    },
    createdAt: '2024-05-22T15:11:19+02:00',
    _links: {
      self: {
        href: `https://api.mollie.com/v2/payments/${paymentId}/routes/${routeId}`,
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/payment-create-route',
        type: 'text/html',
      },
    },
  };
}

function testRoute(route, paymentId = 'tr_5B8cwPMGnU6qLbRvo7qEZo', routeId = 'crt_dyARQ3JzCgtPDhU2Pbq3J') {
  expect(route.resource).toBe('route');
  expect(route.id).toBe(routeId);
  expect(route.paymentId).toBe(paymentId);
  expect(route.description).toBe('Payment for Order #12345');

  expect(route.amount).toEqual({ value: '10.00', currency: 'EUR' });

  expect(route.destination).toEqual({
    type: 'organization',
    organizationId: 'org_123',
  });

  expect(route.createdAt).toBe('2024-05-22T15:11:19+02:00');

  expect(route._links.self).toEqual({
    href: `https://api.mollie.com/v2/payments/${paymentId}/routes/${routeId}`,
    type: 'application/hal+json',
  });

  expect(route._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/payment-create-route',
    type: 'text/html',
  });
}

test('createRoute', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    // TODO: API Bug - Create route endpoint does not return createdAt (unlike other resources)
    // Remove the destructuring workaround below once the API is fixed to return createdAt on create
    const { createdAt, ...mockResponseWithoutCreatedAt } = composeRouteResponse('tr_5B8cwPMGnU6qLbRvo7qEZo', 'crt_dyARQ3JzCgtPDhU2Pbq3J');

    networkMocker
      .intercept('POST', '/payments/tr_5B8cwPMGnU6qLbRvo7qEZo/routes', 200, mockResponseWithoutCreatedAt)
      .twice();

    const route = await bluster(mollieClient.paymentRoutes.create.bind(mollieClient.paymentRoutes))({
      paymentId: 'tr_5B8cwPMGnU6qLbRvo7qEZo',
      amount: { value: '10.00', currency: 'EUR' },
      description: 'Payment for Order #12345',
      destination: { type: 'organization', organizationId: 'org_123' },
    });

    // Exclude createdAt from assertion since create doesn't return it
    const { createdAt: _createdAt, ...routeWithoutCreatedAt } = route;
    const { createdAt: _expectedCreatedAt, ...expectedWithoutCreatedAt } = composeRouteResponse('tr_5B8cwPMGnU6qLbRvo7qEZo', 'crt_dyARQ3JzCgtPDhU2Pbq3J');

    expect(routeWithoutCreatedAt).toMatchObject(expectedWithoutCreatedAt);
  });
});

test('listRoutes', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/payments/tr_5B8cwPMGnU6qLbRvo7qEZo/routes', 200, {
        count: 1,
        _embedded: {
          routes: [composeRouteResponse('tr_5B8cwPMGnU6qLbRvo7qEZo', 'crt_dyARQ3JzCgtPDhU2Pbq3J')],
        },
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/payment-list-routes',
            type: 'text/html',
          },
          self: {
            href: 'https://api.mollie.com/v2/payments/tr_5B8cwPMGnU6qLbRvo7qEZo/routes',
            type: 'application/hal+json',
          },
        },
      })
      .twice();

    const routes = await bluster(mollieClient.paymentRoutes.page.bind(mollieClient.paymentRoutes))({ paymentId: 'tr_5B8cwPMGnU6qLbRvo7qEZo' });

    expect(routes.length).toBe(1);

    expect(routes.links.documentation).toEqual({
      href: 'https://docs.mollie.com/reference/payment-list-routes',
      type: 'text/html',
    });

    expect(routes.links.self).toEqual({
      href: 'https://api.mollie.com/v2/payments/tr_5B8cwPMGnU6qLbRvo7qEZo/routes',
      type: 'application/hal+json',
    });

    testRoute(routes[0]);
  });
});
