import { inspect } from 'util';
import '../matchers/toStartWith';
import NetworkMocker, { getApiKeyClientProvider } from '../NetworkMocker';

test('inspect', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/methods/ideal', 200, {
        resource: 'method',
        id: 'ideal',
        description: 'iDEAL',
        minimumAmount: {
          value: '0.01',
          currency: 'EUR',
        },
        maximumAmount: {
          value: '50000.00',
          currency: 'EUR',
        },
        image: {
          size1x: 'https://www.mollie.com/external/icons/payment-methods/ideal.png',
          size2x: 'https://www.mollie.com/external/icons/payment-methods/ideal%402x.png',
          svg: 'https://www.mollie.com/external/icons/payment-methods/ideal.svg',
        },
        status: 'activated',
        pricing: [
          {
            description: 'Netherlands',
            fixed: {
              value: '0.29',
              currency: 'EUR',
            },
            variable: '0',
          },
        ],
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/methods/ideal?include=pricing',
            type: 'application/hal+json',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/v2/methods-api/get-method',
            type: 'text/html',
          },
        },
      })
      .twice();

    const method = await mollieClient.methods.get('ideal');

    expect(inspect(method)).toStartWith('Method ideal {');
  });
});
