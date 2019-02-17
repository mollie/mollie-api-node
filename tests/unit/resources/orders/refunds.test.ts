import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import OrdersRefundsResource from '@resources/orders/refunds';
import PaymentRefund from '@models/Refund';
import response from '@tests/unit/__stubs__/orders_refunds.json';
import ApiError from '@errors/ApiError';

const mock = new MockAdapter(axios);

const props = {
  id: 're_4qqhO89gsT',
  orderId: 'ord_stTC2WHAuS',
  lines: [
    {
      id: 'odl_dgtxyl',
      quantity: 1,
    },
  ],
};

describe('orders_refunds', () => {
  let ordersRefunds: OrdersRefundsResource;
  beforeEach(() => {
    ordersRefunds = new OrdersRefundsResource(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(OrdersRefundsResource.resource).toBe('orders_refunds');
    expect(OrdersRefundsResource.model).toBe(PaymentRefund);
  });

  describe('.create()', () => {
    mock.onPost(`/orders/${props.orderId}/refunds`).reply(200, response._embedded.refunds[0]);

    it('should return a refund instance', done =>
      ordersRefunds
        .create(props)
        .then(result => {
          expect(result).toBeInstanceOf(PaymentRefund);
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(err => {
          expect(err).toBeUndefined();
          done();
        }));

    it('should work with a callback', done => {
      ordersRefunds.create(props, (err, result) => {
        expect(result).toBeInstanceOf(PaymentRefund);
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.all()', () => {
    const error = { detail: 'The order id is invalid' };
    mock.onGet(`/orders/${props.orderId}/refunds`).reply(200, response);

    it('should return a list of all order refunds', () =>
      ordersRefunds.all({ orderId: props.orderId }).then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should throw an error if "orderId" is not set', done => {
      ordersRefunds
        .all(undefined)
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(error.detail);
          done();
        });
    });

    it('should work with a callback', done => {
      ordersRefunds.all({ orderId: props.orderId }, (err, result) => {
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
      ordersRefunds
        .withParent({
          resource: 'order',
          id: props.orderId,
        })
        .all(undefined)
        .then(result => {
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(err => {
          expect(err).toBeUndefined();
          done();
        });
    });
  });
});
