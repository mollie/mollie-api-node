import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PaymentsRefundsResource from '../../../../src/resources/payments/refunds';
import PaymentRefund from '../../../../src/models/Refund';

import response from '../../__stubs__/payments_refunds.json';

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
  let paymentsRefunds: PaymentsRefundsResource;
  beforeEach(() => {
    paymentsRefunds = new PaymentsRefundsResource(axios.create());
  });

  it('should have a resource name and model', () => {
    const payment = new PaymentsRefundsResource(null);
    expect(payment.resource).toBe('payments_refunds');
    expect(payment.model).toBe(PaymentRefund);
  });

  describe('.create()', () => {
    mock.onPost(`/payments/${props.paymentId}/refunds`).reply(200, response._embedded.refunds[0]);

    it('should return a refund instance', () =>
      paymentsRefunds.create(props).then(result => {
        expect(result).toBeInstanceOf(PaymentRefund);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      paymentsRefunds.create(props, (err, result) => {
        expect(result).toBeInstanceOf(PaymentRefund);
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
        expect(result).toBeInstanceOf(PaymentRefund);
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

    it('should throw an error if "paymentId" is not set', done => {
      paymentsRefunds.all()
        .then(() => {
          throw new Error('This should error out instead');
        })
        .catch(error => {
          expect(error).toBeInstanceOf(TypeError);
          done();
        });
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
        expect(result).toBeInstanceOf(PaymentRefund);
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
          expect(result).toBeInstanceOf(PaymentRefund);
          expect(result).toMatchSnapshot();
          done();
        });
    });
  });
});
