import { defaults, get, startsWith } from 'lodash';

import Shipment from '../../models/Shipment';
import List from '../../models/List';
import OrdersBaseResource from './base';
import { ICreateParams, IGetParams, IListParams, IUpdateParams } from '../../types/shipment/params';
import { CreateCallback, GetCallback, ListCallback, UpdateCallback } from '../../types/shipment/callback';
import Order from '../../models/Order';
import Resource from '../../resource';
import NotImplementedError from '../../errors/NotImplementedError';

/**
 * The `order_shipments` resource
 *
 * @since 3.0.0
 */
export default class OrdersShipmentsResource extends OrdersBaseResource {
  public static resource = 'orders_shipments';
  public static model = Shipment;
  public apiName = 'Shipments API';

  /**
   * List order shipments
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/shipments-api/list-shipments
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all = this.list;
  /**
   * List order shipments
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/shipments-api/list-shipments
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page = this.list;

  /**
   * In addition to the
   * {@link https://docs.mollie.com/reference/v2/orders-api/create-order Orders API},
   * the create shipment endpoint can be used to ship order lines.
   *
   * When using Klarna Pay later and Klarna Slice it this is mandatory
   * for the order amount to be captured. An capture will automatically
   * be created for the shipment.
   *
   * The word “shipping” is used in the figurative sense here. It can also
   * mean that a service was provided or digital content was delivered.
   *
   * @param params - Create Shipment parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly created Shipment object
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/shipments-api/create-shipment
   *
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Shipment> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const orderId = get(params, 'orderId') || this.parentId;
      if (!startsWith(orderId, Order.resourcePrefix)) {
        Resource.createApiError('The order id  is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(orderId);

      return super.create(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Shipment>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { orderId, ...parameters } = defaults(params, { orderId: this.parentId });
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.createApiError('The order id is invalid', typeof params === 'function' ? params : cb);
    }
    this.setParentId(orderId);

    return super.create(parameters) as Promise<Shipment>;
  }

  /**
   * Update a Shipment
   *
   * @param id - Shipment ID
   * @param params - Update Shipment parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Shipment>}
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/shipments-api/update-shipment
   *
   * @public ✓ This method is part of the public API
   */
  public async update(id: string, params: IUpdateParams | UpdateCallback, cb?: UpdateCallback): Promise<Shipment> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Shipment.resourcePrefix)) {
        Resource.createApiError('The orders_shipments id is invalid', typeof params === 'function' ? params : cb);
      }
      const orderId = get(params, 'orderId') || this.parentId;
      if (!startsWith(orderId, Order.resourcePrefix)) {
        Resource.createApiError('The order id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(orderId);

      return super.get(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Shipment>;
    }

    if (!startsWith(id, Shipment.resourcePrefix)) {
      Resource.createApiError('The orders_shipments id is invalid');
    }
    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { orderId, ...parameters } = defaults(params, { orderId: this.parentId });
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.createApiError('The order id is invalid');
    }
    this.setParentId(orderId);

    return super.update(id, parameters) as Promise<Shipment>;
  }

  /**
   * Get a Shipment by ID
   *
   * @param id - Shipment ID
   * @param params - Get Shipment parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The Shipment object
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/shipments-api/get-shipment
   *
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams, cb?: GetCallback): Promise<Shipment> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Shipment.resourcePrefix)) {
        Resource.createApiError('The orders_shipments id is invalid', cb);
      }
      const orderId = get(params, 'orderId') || this.parentId;
      if (!startsWith(orderId, Order.resourcePrefix)) {
        Resource.createApiError('The order id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(orderId);

      return super.get(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Shipment>;
    }

    if (!startsWith(id, Shipment.resourcePrefix)) {
      Resource.createApiError('The orders_shipments id is invalid', cb);
    }
    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { orderId, ...parameters } = defaults(params, { orderId: this.parentId });
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.createApiError('The order id is invalid');
    }
    this.setParentId(orderId);

    return super.get(id, parameters) as Promise<Shipment>;
  }

  /**
   * List order shipments
   *
   * @param params - List Order parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Shipments
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/shipments-api/list-shipments
   *
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Shipment>> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const orderId = get(params, 'orderId') || this.parentId;
      if (!startsWith(orderId, Order.resourcePrefix)) {
        Resource.createApiError('The order id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(orderId);

      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Shipment>>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { orderId, ...parameters } = defaults(params, { orderId: this.parentId });
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.createApiError('The order id is invalid', typeof params === 'function' ? params : cb);
    }
    this.setParentId(orderId);

    return super.list(parameters) as Promise<List<Shipment>>;
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async cancel(): Promise<boolean> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async delete(): Promise<boolean> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }
}
