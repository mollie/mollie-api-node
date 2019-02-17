import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Payments from '@resources/payments';
import Payment from '@models/Payment';
import response from '@tests/unit/__stubs__/payments.json';
import ApiError from '@errors/ApiError';

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
    const error = {
      field: 'amount',
      detail: 'The amount is lower than the minimum',
    };

    mock
      .onPost('/payments', {
        ...props,
        amount: { value: '0.05', currency: 'EUR' },
      })
      .reply(500, error);
    mock.onPost('/payments').reply(200, response._embedded.payments[0]);
    mock.onPost('/payments?include=details.qrCode').reply(200, response._embedded.payments[1]);

    it('should return a payment instance', () =>
      payments.create(props).then(result => {
        expect(result).toBeInstanceOf(Payment);
        expect(result.amount.value).toBe(props.amount.value);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      payments.create(props, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Payment);
        expect(result.amount.value).toBe(props.amount.value);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should fail with a unsupported amount', done =>
      payments
        .create({
          ...props,
          amount: { value: '0.05', currency: 'EUR' },
        })
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(error.detail);
          expect(err.getField()).toBe(error.field);
          done();
        }));

    it('should return a QR code', done =>
      payments
        .create({
          ...props,
          include: 'details.qrCode',
        })
        .then(result => {
          expect(result).toBeInstanceOf(Payment);
          expect(result.amount.value).toBe(props.amount.value);
          expect(result.details.qrCode.width).toBe(180);
          expect(result).toMatchSnapshot();
          done();
        }));
  });

  describe('.get()', () => {
    const error = new ApiError('The payment id is invalid');

    mock.onGet(`/payments/${props.id}`).reply(200, response._embedded.payments[0]);
    mock.onGet('/payments/foo').reply(500, error);

    it('should return a payment instance', () =>
      payments.get(props.id).then(result => {
        expect(result).toBeInstanceOf(Payment);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      payments.get(props.id, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Payment);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should return an error for non-existing IDs', done =>
      payments
        .get('foo')
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          done();
        }));

    it('should return an error with a callback for non-existing IDs', done => {
      payments.get('foo', (err, result) => {
        expect(err).toBeInstanceOf(ApiError);
        expect(err).toEqual(error);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('.all()', () => {
    mock.onGet('/payments').reply(200, response);

    it('should return a list of all payments', () =>
      payments.all().then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      payments.all((err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.cancel()', () => {
    const error = { detail: 'Method not allowed' };

    mock.onDelete(`/payments/expired`).reply(500, error);
    mock.onDelete(`/payments/${props.id}`).reply(200, response._embedded.payments[0]);

    it('should return the canceled payment when it could be canceled', done =>
      payments
        .cancel(props.id)
        .then(result => {
          expect(result).toMatchObject(response._embedded.payments[0]);
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(err => expect(err).toBeUndefined()));

    it('should return the status when the payment could not be canceled', done => {
      payments
        .cancel('expired')
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          done();
        });
    });
  });
});
