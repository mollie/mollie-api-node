import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import OrdersRefunds from '../../../../src/resources/orders/refunds';
import Refund from '../../../../src/models/refund';

import response from '../../__stubs__/orders_refunds.json';

const mock = new MockAdapter(axios);

const props = {
  id: 're_4qqhO89gsT',
  orderId: 'ord_stTC2WHAuS',
  lines: [
    {
      id: 'odl_dgtxyl',
      quantity: 1
    }
  ],
};

describe('orders_refunds', () => {
  let ordersRefunds;
  beforeEach(() => {
    ordersRefunds = new OrdersRefunds(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(OrdersRefunds.resource).toBe('orders_refunds');
    expect(OrdersRefunds.model).toBe(Refund);
  });

  describe('.create()', () => {
    mock.onPost(`/orders/${props.orderId}/refunds`).reply(200, response._embedded.refunds[0]);

    it('should return a refund instance', () =>
      ordersRefunds.create(props).then(result => {
        expect(result).toBeInstanceOf(Refund);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      ordersRefunds.create(props, (err, result) => {
        expect(result).toBeInstanceOf(Refund);
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.all()', () => {
    mock.onGet(`/orders/${props.orderId}/refunds`).reply(200, response);

    it('should return a list of all order refunds', () =>
      ordersRefunds.all({ orderId: props.orderId }).then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should throw an error if "orderId" is not set', () => {
      const getRefunds = () => ordersRefunds.all();

      expect(getRefunds).toThrowError(TypeError);
    });

    it('should work with a callback', done => {
      ordersRefunds
        .withParent({
          resource: 'order',
          id: props.orderId,
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
