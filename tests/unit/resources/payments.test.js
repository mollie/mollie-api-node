import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Payments from 'resources/payments';
import Payment from 'models/payment';

import response from '../__stubs__/payments.json';

const mock = new MockAdapter(axios);

const props = {
  id: 'tr_nBeryjMVjr',
  amount: {
    currency: 'GBP',
    value: '75.00',
  },
  description: 'Test payment',
  method: 'ideal',
  metadata: {
    orderId: '12345',
  },
};

describe('payments', () => {
  let payments;
  beforeEach(() => {
    payments = new Payments(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(Payments.resource).toBe('payments');
    expect(Payments.model).toBe(Payment);
  });

  describe('.create()', () => {
    const error = { error: { field: 'amount', message: 'The amount is lower than the minimum' }};

    mock.onPost('/payments', Object.assign({}, props, { amount: { value: '0.05', currency: 'EUR' } })).reply(500, error);
    mock.onPost('/payments').reply(200, response._embedded.payments[0]);

    it('should return a payment instance', () =>
      payments.create(props).then((result) => {
        expect(result).toBeInstanceOf(Payment);
        expect(result.amount.value).toBe(props.amount.value);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', (done) => {
      payments.create(props, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Payment);
        expect(result.amount.value).toBe(props.amount.value);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should fail with a unsupported amount', () =>
      payments
        .create(Object.assign({}, props, { amount: { value: '0.05', currency: 'EUR' } }))
        .then(() => {
          throw new Error('Should reject');
        })
        .catch((err) => {
          expect(err).toBe(error);
          expect(err.error.field).toBe('amount');
        }));
  });

  describe('.get()', () => {
    const error = { error: { message: 'The payment id is invalid' } };

    mock.onGet(`/payments/${props.id}`).reply(200, response._embedded.payments[0]);
    mock.onGet('/payments/foo').reply(500, error);

    it('should return a payment instance', () =>
      payments.get(props.id).then((result) => {
        expect(result).toBeInstanceOf(Payment);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', (done) => {
      payments.get(props.id, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Payment);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should return an error for non-existing IDs', () =>
      payments
        .get('foo')
        .then(() => {
          throw new Error('Should reject');
        })
        .catch((err) => {
          expect(err).toBe(error);
        }));

    it('should return an error with a callback for non-existing IDs', (done) => {
      payments.get('foo', (err, result) => {
        expect(err).toBe(error);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('.all()', () => {
    mock.onGet('/payments').reply(200, response);

    it('should return a list of all payments', () =>
      payments.all().then((result) => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', (done) => {
      payments.all((err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.delete()', () => {
    const error = { error: { message: 'Method not allowed' }};

    mock.onDelete(`/payments/${props.id}`).reply(500, error);

    it('should fail', () =>
      payments
        .delete(props.id)
        .then(() => {
          throw new Error('Should reject');
        })
        .catch((err) => {
          expect(err).toBe(error);
        }));
  });
});
