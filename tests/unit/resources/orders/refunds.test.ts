import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import OrdersRefunds from '../../../../src/resources/orders/refunds';
import PaymentRefund from '../../../../src/models/Refund';

import response from '../../__stubs__/orders_refunds.json';

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
  let ordersRefunds: OrdersRefunds;
  beforeEach(() => {
    ordersRefunds = new OrdersRefunds(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(OrdersRefunds.resource).toBe('orders_refunds');
    expect(OrdersRefunds.model).toBe(PaymentRefund);
  });

  describe('.create()', () => {
    mock.onPost(`/orders/${props.orderId}/refunds`).reply(200, response._embedded.refunds[0]);

    it('should return a refund instance', done =>
      ordersRefunds.create(props)
        .then(result => {
          expect(result).toBeInstanceOf(PaymentRefund);
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(err => {
          expect(err).toBeUndefined();
          done();
        })
    );

    it('should work with a callback', done => {
      ordersRefunds.create(props, (err, result) => {
        expect(result).toBeInstanceOf(PaymentRefund);
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

    // TODO: might have to be removed, this immediately crashes on JS/TS anyway
    // it('should throw an error if "orderId" is not set', () => {
    //   const getRefunds = () => ordersRefunds.all();
    //
    //   expect(getRefunds).toThrowError();
    // });

    it('should work with a callback', done => {
      ordersRefunds.all({ orderId: props.orderId }, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });
});
