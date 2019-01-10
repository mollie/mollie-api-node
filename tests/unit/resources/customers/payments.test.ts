import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import CustomersPayments from '../../../../src/resources/customers/payments';
import Payment from '../../../../src/models/Payment';

import response from '../../__stubs__/customers_payments.json';

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
    const payment = new CustomersPayments(null);
    expect(payment.resource).toBe('customers_payments');
    expect(payment.model).toBe(Payment);
  });

  describe('.create()', () => {
    mock
      .onPost(`/customers/${props.customerId}/payments`)
      .reply(200, response._embedded.payments[0]);

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

  describe('.get()', () => {
    const error = { error: { message: 'The customers_mandate id is invalid' } };

    mock
      .onGet(`/customers/${props.customerId}/payments/${props.id}`)
      .reply(200, response._embedded.payments[0]);
    mock.onGet(`/customers/${props.customerId}/payments/foo`).reply(500, error);

    it('should return a payment instance', done =>
      customersPayments.get(props.id, { customerId: props.customerId })
        .then(result => {
          expect(result).toBeInstanceOf(Payment);
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(err => expect(err).toBeUndefined())
    );

    it('should work with a callback', done => {
      customersPayments.get(props.id, { customerId: props.customerId }, (err, result) => {
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
        .get(props.id, (err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Payment);
          expect(result).toMatchSnapshot();
          done();
        });
    });
  });

  describe('.list()', () => {
    mock.onGet(`/customers/${props.customerId}/payments`).reply(200, response);

    it('should return a list of all customer payments', done =>
      customersPayments.list({ customerId: props.customerId })
        .then(result => {
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(err => expect(err).toBeUndefined())
    );

    it('should throw an error if "customerId" is not set', () => {
      const getPayments = () => customersPayments.list();

      expect(getPayments).toThrowError(TypeError);
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

    it('should work with withParent', () =>
      customersPayments
        .withParent({
          resource: 'customer',
          id: props.customerId,
        })
        .list()
        .then(result => {
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
        }));
  });
});
