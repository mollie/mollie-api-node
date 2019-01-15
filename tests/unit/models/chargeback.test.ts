import Chargeback from '../../../src/models/Chargeback';

describe('chargeback model', () => {
  it('should instantiate with default values', () => {
    const chargeback = new Chargeback();

    expect(chargeback.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const chargebackProps = {
      resource: 'chargeback',
      id: 'chb_n9z0tp',
      amount: {
        currency: 'USD',
        value: '43.38'
      },
      settlementAmount: {
        currency: 'EUR',
        value: '-35.07'
      },
      createdAt: '2018-03-14T17:00:52.0Z',
      reversedAt: null,
      paymentId: 'tr_WDqYK6vllg',
      _links: {
        self: {
          href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg/chargebacks/chb_n9z0tp',
          type: 'application/hal+json',
        },
        payment: {
          href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg',
          type: 'application/hal+json',
        },
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback',
          type: 'text/html',
        }
      }
    };
    const chargeback = new Chargeback(chargebackProps);

    expect(chargeback.toPlainObject()).toMatchSnapshot();
  });
});
