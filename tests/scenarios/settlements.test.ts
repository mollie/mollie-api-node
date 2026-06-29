import { MollieClient } from '../..';
import getHead from '../getHead';
import NetworkMocker, { getAccessTokenClientProvider } from '../NetworkMocker';

// Note that ‒ as the test suite cannot create settlements ‒ specific settlements are expected to be in place.
describe('settlements', () => {
  const networkMocker = new NetworkMocker(getAccessTokenClientProvider(true));
  let mollieClient: MollieClient;

  beforeAll(async () => {
    mollieClient = await networkMocker.prepare();

    networkMocker
      .intercept('GET', /\/settlements\/(stl_jDk30akdN|1234567\.1804\.03)$/, 200, {
        resource: 'settlement',
        id: 'stl_jDk30akdN',
        reference: '1234567.1804.03',
        createdAt: '2018-04-06T06:00:01.0Z',
        settledAt: '2018-04-06T09:41:44.0Z',
        status: 'paidout',
        amount: {
          value: '39.75',
          currency: 'EUR',
        },
        periods: {
          '2018': {
            '04': {
              revenue: [
                {
                  description: 'iDEAL',
                  method: 'ideal',
                  count: 6,
                  amountNet: {
                    value: '86.1000',
                    currency: 'EUR',
                  },
                  amountVat: null,
                  amountGross: {
                    value: '86.1000',
                    currency: 'EUR',
                  },
                },
                {
                  description: 'Refunds iDEAL',
                  method: 'refund',
                  count: 2,
                  amountNet: {
                    value: '-43.2000',
                    currency: 'EUR',
                  },
                  amountVat: null,
                  amountGross: {
                    value: '43.2000',
                    currency: 'EUR',
                  },
                },
              ],
              costs: [
                {
                  description: 'iDEAL',
                  method: 'ideal',
                  count: 6,
                  rate: {
                    fixed: {
                      value: '0.3500',
                      currency: 'EUR',
                    },
                    percentage: null,
                  },
                  amountNet: {
                    value: '2.1000',
                    currency: 'EUR',
                  },
                  amountVat: {
                    value: '0.4410',
                    currency: 'EUR',
                  },
                  amountGross: {
                    value: '2.5410',
                    currency: 'EUR',
                  },
                },
                {
                  description: 'Refunds iDEAL',
                  method: 'refund',
                  count: 2,
                  rate: {
                    fixed: {
                      value: '0.2500',
                      currency: 'EUR',
                    },
                    percentage: null,
                  },
                  amountNet: {
                    value: '0.5000',
                    currency: 'EUR',
                  },
                  amountVat: {
                    value: '0.1050',
                    currency: 'EUR',
                  },
                  amountGross: {
                    value: '0.6050',
                    currency: 'EUR',
                  },
                },
              ],
              invoiceId: 'inv_FrvewDA3Pr',
            },
          },
        },
        invoiceId: 'inv_FrvewDA3Pr',
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN',
            type: 'application/hal+json',
          },
          invoice: {
            href: 'https://api.mollie.com/v2/invoices/inv_FrvewDA3Pr',
            type: 'application/hal+json',
          },
          payments: {
            href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN/payments',
            type: 'application/hal+json',
          },
          refunds: {
            href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN/refunds',
            type: 'application/hal+json',
          },
          chargebacks: {
            href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN/chargebacks',
            type: 'application/hal+json',
          },
          captures: {
            href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN/captures',
            type: 'application/hal+json',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/v2/settlements-api/get-settlement',
            type: 'text/html',
          },
        },
      })
      .times(Number.POSITIVE_INFINITY);
  });

  test('settlements', async () => {
    let settlement = await mollieClient.settlements.get('stl_jDk30akdN');
    expect(settlement.id).toBe('stl_jDk30akdN');

    settlement = await mollieClient.settlements.get('1234567.1804.03');
    expect(settlement.reference).toBe('1234567.1804.03');
  });

  test('settlementPayments', async () => {
    networkMocker
      .intercept('GET', /\/settlements\/stl_jDk30akdN\/payments\?limit=\d+$/, 200, {
        count: 1,
        _embedded: {
          payments: [
            {
              resource: 'payment',
              id: 'tr_7UhSN1zuXS',
              mode: 'test',
              createdAt: '2018-02-12T11:58:35.0Z',
              expiresAt: '2018-02-12T12:13:35.0Z',
              status: 'open',
              isCancelable: false,
              amount: {
                value: '75.00',
                currency: 'GBP',
              },
              description: 'Order #12345',
              method: 'ideal',
              metadata: null,
              details: null,
              profileId: 'pfl_QkEhN94Ba',
              settlementId: 'stl_jDk30akdN',
              redirectUrl: 'https://webshop.example.org/order/12345/',
              _links: {
                self: {
                  href: 'https://api.mollie.com/v2/payments/tr_7UhSN1zuXS',
                  type: 'application/hal+json',
                },
                settlement: {
                  href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN',
                  type: 'application/hal+json',
                },
              },
            },
          ],
        },
        _links: {
          self: {
            href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN/payments?limit=x',
            type: 'application/hal+json',
          },
          previous: null,
          next: {
            href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN/payments?from=tr_SDkzMggpvx&limit=5',
            type: 'application/hal+json',
          },
          documentation: {
            href: 'https://docs.mollie.com/reference/v2/settlements-api/list-settlement-payments',
            type: 'text/html',
          },
        },
      })
      .twice();
    let payment = await getHead(mollieClient.settlementPayments.page({ settlementId: 'stl_jDk30akdN', limit: 1 }));
    expect(payment.id).toBe('tr_7UhSN1zuXS');

    const settlement = await mollieClient.settlements.get('stl_jDk30akdN');
    payment = await getHead(settlement.getPayments());
    expect(payment.id).toBe('tr_7UhSN1zuXS');
  });

  test('settlementCaptures', async () => {
    networkMocker
      .intercept('GET', /settlements\/stl_jDk30akdN\/captures\?limit=\d+$/, 200, {
        _embedded: {
          captures: [
            {
              resource: 'capture',
              id: 'cpt_4qqhO89gsT',
              mode: 'live',
              amount: {
                value: '1027.99',
                currency: 'EUR',
              },
              settlementAmount: {
                value: '399.00',
                currency: 'EUR',
              },
              paymentId: 'tr_WDqYK6vllg',
              shipmentId: 'shp_3wmsgCJN4U',
              settlementId: 'stl_jDk30akdN',
              createdAt: '2018-08-02T09:29:56+00:00',
              _links: {
                self: {
                  href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT',
                  type: 'application/hal+json',
                },
                payment: {
                  href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg',
                  type: 'application/hal+json',
                },
                shipment: {
                  href: 'https://api.mollie.com/v2/orders/ord_8wmqcHMN4U/shipments/shp_3wmsgCJN4U',
                  type: 'application/hal+json',
                },
                settlement: {
                  href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN',
                  type: 'application/hal+json',
                },
                documentation: {
                  href: 'https://docs.mollie.com/reference/v2/captures-api/get-capture',
                  type: 'text/html',
                },
              },
            },
          ],
        },
        count: 1,
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/v2/settlements-api/list-settlement-captures',
            type: 'text/html',
          },
          self: {
            href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN/captures?limit=x',
            type: 'application/hal+json',
          },
          previous: null,
          next: null,
        },
      })
      .twice();
    let capture = await getHead(mollieClient.settlementCaptures.page({ settlementId: 'stl_jDk30akdN', limit: 1 }));
    expect(capture.id).toBe('cpt_4qqhO89gsT');

    const settlement = await mollieClient.settlements.get('stl_jDk30akdN');
    capture = await getHead(settlement.getCaptures());
    expect(capture.id).toBe('cpt_4qqhO89gsT');
  });

  test('settlementRefunds', async () => {
    networkMocker
      .intercept('GET', /settlements\/stl_jDk30akdN\/refunds\?limit=\d+$/, 200, {
        _embedded: {
          refunds: [
            {
              resource: 'refund',
              id: 're_3aKhkUNigy',
              amount: {
                value: '10.00',
                currency: 'EUR',
              },
              status: 'refunded',
              createdAt: '2018-08-30T07:59:02+00:00',
              description: 'Order #33',
              paymentId: 'tr_maJaG2j8OM',
              settlementAmount: {
                value: '-10.00',
                currency: 'EUR',
              },
              settlementId: 'stl_jDk30akdN',
              _links: {
                self: {
                  href: 'https://api.mollie.com/v2/payments/tr_maJaG2j8OM/refunds/re_3aKhkUNigy',
                  type: 'application/hal+json',
                },
                payment: {
                  href: 'https://api.mollie.com/v2/payments/tr_maJaG2j8OM',
                  type: 'application/hal+json',
                },
                settlement: {
                  href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN',
                  type: 'application/hal+json',
                },
              },
            },
          ],
        },
        count: 1,
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/v2/settlements-api/list-settlement-refunds',
            type: 'text/html',
          },
          self: {
            href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN/refunds?limit=x',
            type: 'application/hal+json',
          },
          previous: null,
          next: null,
        },
      })
      .twice();
    let refund = await getHead(mollieClient.settlementRefunds.page({ settlementId: 'stl_jDk30akdN', limit: 1 }));
    expect(refund.id).toBe('re_3aKhkUNigy');

    const settlement = await mollieClient.settlements.get('stl_jDk30akdN');
    refund = await getHead(settlement.getRefunds());
    expect(refund.id).toBe('re_3aKhkUNigy');
  });

  test('settlementChargebacks', async () => {
    networkMocker
      .intercept('GET', /settlements\/stl_jDk30akdN\/chargebacks\?limit=\d+$/, 200, {
        count: 1,
        _embedded: {
          chargebacks: [
            {
              resource: 'chargeback',
              id: 'chb_n9z0tp',
              amount: {
                value: '43.38',
                currency: 'USD',
              },
              settlementAmount: {
                value: '-37.14',
                currency: 'EUR',
              },
              createdAt: '2018-03-14T17:00:52.0Z',
              reversedAt: null,
              paymentId: 'tr_WDqYK6vllg',
              settlementId: 'stl_jDk30akdN',
              _links: {
                self: {
                  href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg/chargebacks/chb_n9z0tp',
                  type: 'application/hal+json',
                },
                payment: {
                  href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg',
                  type: 'application/hal+json',
                },
                settlement: {
                  href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN',
                  type: 'application/hal+json',
                },
              },
            },
          ],
        },
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/v2/settlements-api/list-settlement-chargebacks',
            type: 'text/html',
          },
          self: {
            href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN/chargebacks?limit=x',
            type: 'application/hal+json',
          },
          previous: null,
          next: null,
        },
      })
      .twice();
    let chargeback = await getHead(mollieClient.settlementChargebacks.page({ settlementId: 'stl_jDk30akdN', limit: 1 }));
    expect(chargeback.id).toBe('chb_n9z0tp');

    const settlement = await mollieClient.settlements.get('stl_jDk30akdN');
    chargeback = await getHead(settlement.getChargebacks());
    expect(chargeback.id).toBe('chb_n9z0tp');
  });

  afterAll(() => networkMocker.cleanup());
});
