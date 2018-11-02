import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PaymentsRefunds from 'resources/payments/refunds';
import Refund from 'models/refund';

import response from '../../__stubs__/refunds.json';

const mock = new MockAdapter(axios);

const props = {
  id: 're_4qqhO89gsT',
  paymentId: 'tr_WDqYK6vllg',
  amount: {
    currency: 'EUR',
    value: '5.95',
  },
};

describe('payments_refunds', () => {
  let paymentsRefunds;
  beforeEach(() => {
    paymentsRefunds = new PaymentsRefunds(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(PaymentsRefunds.resource).toBe('payments_refunds');
    expect(PaymentsRefunds.model).toBe(Refund);
  });

  describe('.create()', () => {
    mock.onPost(`/payments/${props.paymentId}/refunds`).reply(200, response._embedded.refunds[0]);

    it('should return a refund instance', () =>
      paymentsRefunds.create(props).then(result => {
        expect(result).toBeInstanceOf(Refund);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      paymentsRefunds.create(props, (err, result) => {
        expect(result).toBeInstanceOf(Refund);
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.get()', () => {
    const error = { error: { message: 'The payments_refund id is invalid' } };

    mock
      .onGet(`/payments/${props.paymentId}/refunds/${props.id}`)
      .reply(200, response._embedded.refunds[0]);
    mock.onGet(`/payments/${props.paymentId}/refunds/foo`).reply(500, error);

    it('should return a refund instance', () =>
      paymentsRefunds.get(props.id, { paymentId: props.paymentId }).then(result => {
        expect(result).toBeInstanceOf(Refund);
        expect(result).toMatchSnapshot();
      }));

    it('should return an error for non-existing IDs', () =>
      paymentsRefunds
        .get('foo', { paymentId: props.paymentId })
        .then(() => {
          throw new Error('Should reject');
        })
        .catch(err => {
          expect(err).toEqual(error);
        }));
  });

  describe('.all()', () => {
    mock.onGet(`/payments/${props.paymentId}/refunds`).reply(200, response);

    it('should return a list of all payment refunds', () =>
      paymentsRefunds.all({ paymentId: props.paymentId }).then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should throw an error if "paymentId" is not set', () => {
      const getRefunds = () => paymentsRefunds.all();

      expect(getRefunds).toThrowError(TypeError);
    });

    it('should work with a callback', done => {
      paymentsRefunds
        .withParent({
          resource: 'payment',
          id: props.paymentId,
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

  describe('.cancel()', () => {
    mock
      .onDelete(`/payments/${props.paymentId}/refunds/${props.id}`)
      .reply(200, response._embedded.refunds[0]);

    it('should return a refund instance', () =>
      paymentsRefunds.cancel(props.id, { paymentId: props.paymentId }).then(result => {
        expect(result).toBeInstanceOf(Refund);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback and legacy delete', done => {
      paymentsRefunds
        .withParent({
          resource: 'payment',
          id: props.paymentId,
        })
        .delete(props.id, (err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Refund);
          expect(result).toMatchSnapshot();
          done();
        });
    });
  });
});
