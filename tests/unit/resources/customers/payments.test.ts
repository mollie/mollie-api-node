import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import CustomersPayments from '@resources/customers/payments';
import Payment from '@models/Payment';
import response from '@tests/unit/__stubs__/customers_payments.json';
import ApiError from '@errors/ApiError';

const mock = new MockAdapter(axios);

const props = {
  id: 'tr_McVBfE9Ceq',
  amount: {
    currency: 'EUR',
    value: '10.00',
  },
  description: 'Test customer payment of €10.00',
  customerId: 'cst_c24gk2t3G6',
  redirectUrl: 'https://www.example.org/',
};

describe('customers_payments', () => {
  let customersPayments: CustomersPayments;
  beforeEach(() => {
    customersPayments = new CustomersPayments(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(CustomersPayments.resource).toBe('customers_payments');
    expect(CustomersPayments.model).toBe(Payment);
  });

  describe('.create()', () => {
    mock.onPost(`/customers/${props.customerId}/payments`).reply(200, response._embedded.payments[0]);

    it('should return a payment instance', () =>
      customersPayments.create(props).then(result => {
        expect(result).toBeInstanceOf(Payment);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      customersPayments.create(props, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Payment);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should work with withParent', done => {
      customersPayments
        .withParent({
          resource: 'customer',
          id: props.customerId,
        })
        .create(props, (err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Payment);
          expect(result).toMatchSnapshot();
          done();
        });
    });
  });

  describe('.list()', () => {
    const error = { detail: 'The customer id is invalid' };
    mock.onGet(`/customers/${props.customerId}/payments`).reply(200, response);

    it('should return a list of all customer payments', done => {
      customersPayments
        .list({ customerId: props.customerId })
        .then(result => {
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(err => expect(err).toBeUndefined());
    });

    it('should throw an error if "customerId" is not set', done => {
      customersPayments
        .list(undefined)
        .then(() => {
          throw Error('Should error out');
        })
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(error.detail);
          done();
        });
    });

    it('should work with a callback', done => {
      customersPayments.list(props, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });

    /**
     * @deprecated 3.0.0
     */
    it('should work with .withParent()', done => {
      customersPayments
        .withParent({
          resource: 'customer',
          id: props.customerId,
        })
        .list((err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        });
    });

    /**
     * @deprecated 3.0.0
     */
    it('should work with a Promise and with .withParent()', done => {
      customersPayments
        .withParent({
          resource: 'customer',
          id: props.customerId,
        })
        .list(undefined)
        .then(result => {
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(err => {
          expect(err).toBeNull();
          done();
        });
    });
  });
});
