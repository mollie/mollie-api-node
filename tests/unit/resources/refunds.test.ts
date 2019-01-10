import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Refunds from '../../../src/resources/refunds';
import PaymentRefund from '../../../src/models/Refund';

import response from '../__stubs__/payments_refunds.json';

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
    const refund = new Refunds(null);
    expect(refund.resource).toBe('refunds');
    expect(refund.model).toBe(PaymentRefund);
  });

  // FIXME: create no longer exists on the /refunds endpoint (payment/order refunds instead)?
  // describe('.create()', () => {
  //   mock.onPost('/refunds', props).reply(200, response._embedded.refunds[0]);
  //
  //   it('should return a refund instance', () =>
  //     refunds.create(props).then(result => {
  //       expect(result).toBeInstanceOf(PaymentRefund);
  //       expect(result).toMatchSnapshot();
  //     }));
  //
  //   it('should work with a callback', done => {
  //     refunds.create(props, (err, result) => {
  //       expect(result).toBeInstanceOf(PaymentRefund);
  //       expect(result).toMatchSnapshot();
  //       done();
  //     });
  //   });
  // });

  // FIXME: get no longer exists on the /refunds endpoint?
  // describe('.get()', () => {
  //   const error = { error: { message: 'The refund id is invalid' } };
  //
  //   mock.onGet(`/refunds/${props.id}`).reply(200, response._embedded.refunds[0]);
  //   mock.onGet('/refunds/foo').reply(500, error);
  //
  //   it('should return a refund instance', () =>
  //     refunds.get(props.id).then(result => {
  //       expect(result).toBeInstanceOf(PaymentRefund);
  //       expect(result).toMatchSnapshot();
  //     }));
  //
  //   it('should return an error for non-existing IDs', () =>
  //     refunds
  //       .get('foo')
  //       .then(() => {
  //         throw new Error('Should reject');
  //       })
  //       .catch(err => {
  //         expect(err).toEqual(error);
  //       }));
  // });

  describe('.all()', () => {
    mock.onGet(`/refunds`).reply(200, response);

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
