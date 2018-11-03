import Shipment from '../../models/shipment';
import omit from 'lodash/omit';
import OrdersResource from './base';
import Resource from '../../resource';

/**
 * The `order_shipments` resource
 *
 * @since 2.2.0
 */
export default class OrdersShipments extends OrdersResource {
  static resource = 'orders_shipments';
  static model = Shipment;

  /**
   * Create an order shipment
   *
   * @since 2.2.0
   */
  create(data: Partial<Mollie.OrderShipment>, cb?: Function) {
    this.setParent(data);

    if (typeof data === 'object') {
      data = omit(data, 'orderId'); // eslint-disable-line no-param-reassign
    }

    return super.create(data, cb);
  }

  /**
   * Update a resource by ID
   * @since 1.0.0
   */
  update(id: string, data: Partial<Mollie.OrderShipment>, cb?: Function) {
    if (typeof data === 'function') {
      cb = data; // eslint-disable-line no-param-reassign
    }

    return this.getClient()
      .post(`${this.getResourceUrl()}/${id}`, data)
      .then(response => {
        const model = new (this.constructor as typeof Resource).model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      })
      .catch(error => (this.constructor as typeof Resource).errorHandler(error.response, cb));
  }

  /**
   * Get a shipment by ID
   *
   * @since 2.2.0
   */
  get(id: string, params?: any, cb?: Function) {
    this.setParent(params);

    if (typeof params === 'object') {
      params = omit(params, 'orderId'); // eslint-disable-line no-param-reassign
    }

    return super.get(id, params, cb);
  }

  /**
   * Get all order shipments
   *
   * @since 2.2.0
   */
  all(params?: any, cb?: Function) {
    this.setParent(params);

    if (typeof params === 'object') {
      params = omit(params, 'orderId'); // eslint-disable-line no-param-reassign
    }

    return super.all(params, cb);
  }
}
