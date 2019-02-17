import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import OrdersShipmentsResource from '@resources/orders/shipments';
import Shipment from '@models/Shipment';
import response from '@tests/unit/__stubs__/shipments.json';
import ApiError from '@errors/ApiError';

const mock = new MockAdapter(axios);

const props = {
  id: 'shp_3wmsgCJN4U',
  orderId: 'ord_kEn1PlbGa',
  lines: [],
  tracking: {
    carrier: 'PostNL',
    code: '3SKABA000000000',
    url: 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C',
  },
};

describe('orders_shipments', () => {
  let ordersShipments: OrdersShipmentsResource;
  beforeEach(() => {
    ordersShipments = new OrdersShipmentsResource(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(OrdersShipmentsResource.resource).toBe('orders_shipments');
    expect(OrdersShipmentsResource.model).toBe(Shipment);
  });

  describe('.create()', () => {
    mock.onPost(`/orders/${props.orderId}/shipments`).reply(200, response._embedded.shipments[0]);

    it('should return a shipment instance', () =>
      ordersShipments.create(props).then(result => {
        expect(result).toBeInstanceOf(Shipment);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      ordersShipments.create(props, (err, result) => {
        expect(result).toBeInstanceOf(Shipment);
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.get()', () => {
    const error = { detail: 'The orders_shipments id is invalid' };

    mock.onGet(`/orders/${props.orderId}/shipments/${props.id}`).reply(200, response._embedded.shipments[0]);
    mock.onGet(`/orders/${props.orderId}/shipments/foo`).reply(500, error);

    it('should return a shipment instance', () =>
      ordersShipments.get(props.id, { orderId: props.orderId }).then(result => {
        expect(result).toBeInstanceOf(Shipment);
        expect(result).toMatchSnapshot();
      }));

    it('should return an error for non-existing IDs', done =>
      ordersShipments
        .get('foo', { orderId: props.orderId })
        .then(result => expect(result).toBeUndefined())
        .catch(error => {
          expect(error).toBeInstanceOf(ApiError);
          done();
        }));
  });

  describe('.list()', () => {
    const error = { detail: 'The order id is invalid' };
    mock.onGet(`/orders/${props.orderId}/shipments`).reply(200, response);

    it('should return a list of all payment refunds', () =>
      ordersShipments.list({ orderId: props.orderId }).then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should throw an error if "paymentId" is not set', done => {
      ordersShipments
        .list(undefined)
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(error.detail);
          done();
        });
    });

    it('should work with a callback', done => {
      ordersShipments
        .withParent({
          resource: 'order',
          id: props.orderId,
        })
        .list((err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        });
    });

    it('should work with a callback', done => {
      ordersShipments
        .withParent({
          resource: 'order',
          id: props.orderId,
        })
        .list((err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        });
    });

    it('should work with a Promise and with .withParent()', done => {
      ordersShipments
        .withParent({
          resource: 'order',
          id: props.orderId,
        })
        .list(undefined)
        .then(result => {
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(error => expect(error).toBeUndefined());
    });
  });
});
