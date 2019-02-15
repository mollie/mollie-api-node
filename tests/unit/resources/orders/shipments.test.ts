import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import OrdersShipmentsResource from '../../../../src/resources/orders/shipments';
import Shipment from '../../../../src/models/Shipment';

import response from '../../__stubs__/shipments.json';

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
    const error = { error: { message: 'The orders_shipments id is invalid' } };

    mock.onGet(`/orders/${props.orderId}/shipments/${props.id}`).reply(200, response._embedded.shipments[0]);
    mock.onGet(`/orders/${props.orderId}/shipments/foo`).reply(500, error);

    it('should return a shipment instance', () =>
      ordersShipments.get(props.id, { orderId: props.orderId }).then(result => {
        expect(result).toBeInstanceOf(Shipment);
        expect(result).toMatchSnapshot();
      }));

    it('should return an error for non-existing IDs', () =>
      ordersShipments
        .get('foo', { orderId: props.orderId })
        .then(() => {
          throw new Error('Should reject');
        })
        .catch(err => {
          expect(err).toEqual(error);
        }));
  });

  describe('.list()', () => {
    const error = { error: { message: 'The order id is invalid' } };
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
        .then(() => {
          throw new Error('This should error out instead');
        })
        .catch(err => {
          expect(err).toEqual(error);
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
        .catch(err => {
          expect(err).toBeNull();
        });
    });
  });
});
