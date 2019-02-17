import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Refunds from '@resources/refunds';
import PaymentRefund from '@models/Refund';
import response from '@tests/unit/__stubs__/payments_refunds.json';

const mock = new MockAdapter(axios);

const props = {
  id: 're_4qqhO89gsT',
  amount: {
    currency: 'EUR',
    value: '5.95',
  },
};

describe('refunds', () => {
  let refunds;
  beforeEach(() => {
    refunds = new Refunds(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(Refunds.resource).toBe('refunds');
    expect(Refunds.model).toBe(PaymentRefund);
  });

  describe('.all()', () => {
    mock.onGet('/refunds').reply(200, response);

    it('should return a list of all payment refunds', () =>
      refunds.all().then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      refunds
        .withParent({
          resource: 'payment',
          id: props.id,
        })
        .all((err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        });
    });
  });
});
