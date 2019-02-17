import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Orders from '@resources/orders';

import response from '@tests/unit/__stubs__/orders.json';
import Order from '@models/Order';
import ApiError from '@errors/ApiError';

const mock = new MockAdapter(axios);

const props = {
  id: 'ord_stTC2WHAuS',
  amount: {
    value: '1027.99',
    currency: 'EUR',
  },
  billingAddress: {
    organizationName: 'Mollie B.V.',
    streetAndNumber: 'Keizersgracht 313',
    city: 'Amsterdam',
    region: 'Noord-Holland',
    postalCode: '1234AB',
    country: 'NL',
    title: 'Dhr.',
    givenName: 'Piet',
    familyName: 'Mondriaan',
    email: 'piet@mondriaan.com',
    phone: '+31309202070',
  },
  shippingAddress: {
    organizationName: 'Mollie B.V.',
    streetAndNumber: 'Prinsengracht 313',
    streetAdditional: '4th floor',
    city: 'Haarlem',
    region: 'Noord-Holland',
    postalCode: '5678AB',
    country: 'NL',
    title: 'Mr.',
    givenName: 'Chuck',
    familyName: 'Norris',
    email: 'norris@chucknorrisfacts.net',
  },
  metadata: {
    order_id: '1337',
    description: 'Lego cars',
  },
  consumerDateOfBirth: '1958-01-31',
  locale: 'nl_NL',
  orderNumber: '1337',
  redirectUrl: 'https://example.org/redirect',
  webhookUrl: 'https://example.org/webhook',
  method: 'klarnapaylater',
  lines: [
    {
      type: 'physical',
      sku: '5702016116977',
      name: 'LEGO 42083 Bugatti Chiron',
      productUrl: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
      imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
      quantity: 2,
      vatRate: '21.00',
      unitPrice: {
        currency: 'EUR',
        value: '399.00',
      },
      totalAmount: {
        currency: 'EUR',
        value: '698.00',
      },
      discountAmount: {
        currency: 'EUR',
        value: '100.00',
      },
      vatAmount: {
        currency: 'EUR',
        value: '121.14',
      },
    },
  ],
};

describe('orders', () => {
  let orders;
  beforeEach(() => {
    orders = new Orders(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(Orders.resource).toBe('orders');
    expect(Orders.model).toBe(Order);
  });

  describe('.create()', () => {
    const error = {
      field: 'amount',
      detail: 'The amount is lower than the minimum',
    };

    mock.onPost('/orders', { ...props, amount: { value: '0.05', currency: 'EUR' } }).reply(500, error);
    mock.onPost('/orders').reply(200, response._embedded.orders[0]);

    it('should return an order instance', () =>
      orders.create(props).then(result => {
        expect(result).toBeInstanceOf(Order);
        expect(result.amount.value).toBe(props.amount.value);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      orders.create(props, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Order);
        expect(result.amount.value).toBe(props.amount.value);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should fail with an unsupported amount', done =>
      orders
        .create({
          ...props,
          amount: { value: '0.05', currency: 'EUR' },
        })
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.field).toBe('amount');
          expect(err.getMessage()).toBe(error.detail);
          done();
        }));
  });

  describe('.get()', () => {
    const error = { detail: 'The order id is invalid' };

    mock.onGet(`/orders/${props.id}`).reply(200, response._embedded.orders[0]);
    mock.onGet('/orders/foo').reply(500, error);

    it('should return an order instance', () =>
      orders.get(props.id).then(result => {
        expect(result).toBeInstanceOf(Order);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      orders.get(props.id, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Order);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should return an error for non-existing IDs', done =>
      orders
        .get('foo')
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(error.detail);
          done();
        }));

    it('should return an error with a callback for non-existing IDs', done => {
      orders.get('foo', (err, result) => {
        expect(err).toBeInstanceOf(ApiError);
        expect(err.getMessage()).toEqual(error.detail);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('.list()', () => {
    mock.onGet('/orders').reply(200, response);

    it('should return a list of all orders', done =>
      orders.list().then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      }));

    it('should work with a callback', done => {
      orders.list((err, result) => {
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

    mock.onDelete(`/orders/${props.id}`).reply(200, response._embedded.orders[0]);
    mock.onDelete(`/orders/ord_expired`).reply(500, error);

    it('should return the canceled order when it could be canceled', done =>
      orders
        .delete(props.id)
        .then(order => {
          expect(order).toBeInstanceOf(Order);
          expect(order).toMatchSnapshot();
          done();
        })
        .catch(error => expect(error).toBeUndefined()));

    it('should throw an error when the order could not be canceled', done => {
      orders
        .cancel('ord_expired')
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(error.detail);
          done();
        });
    });
  });
});
