import Shipment from '../../models/Shipment';
import List from '../../models/List';
import ApiException from '../../exceptions/ApiException';
import OrdersBaseResource from './base';

/**
 * The `order_shipments` resource
 *
 * @since 2.2.0
 */
export default class OrdersShipmentsResource extends OrdersBaseResource {
  public static resource = 'orders_shipments';
  public static model = Shipment;
  public static apiName = 'Shipments API';

  public async create(params: Mollie.Shipment.Params.ICreate, cb?: Function): Promise<Shipment> {
    const { orderId, ...parameters } = params;
    this.setParentId(orderId);

    return super.create(parameters, cb) as Promise<Shipment>;
  }

  /**
   * Update a Shipment
   *
   * @param {string}                          id     Shipment ID
   * @param {Mollie.Shipment.Params.IUpdate}  params
   * @param {Mollie.Shipment.Callback.Update} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Shipment>}
   *
   * @since 2.2.0
   *
   * @see
   * @public ✓ This method is part of the public API
   */
  public async update(
    id: string,
    params: Mollie.Shipment.Params.IUpdate,
    cb?: Mollie.Shipment.Callback.Update,
  ): Promise<Shipment> {
    const { orderId, ...parameters } = params;
    this.setParentId(orderId);

    return super.update(id, parameters, cb) as Promise<Shipment>;
  }

  /**
   * Get a Shipment by ID
   *
   * @param {string}                       id     Shipment ID
   * @param {Mollie.Shipment.Params.IGet}  params
   * @param {Mollie.Shipment.Callback.Get} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @since 2.2.0
   *
   * @see
   * @public ✓ This method is part of the public API
   */
  public async get(
    id: string,
    params?: Mollie.Shipment.Params.IGet,
    cb?: Mollie.Shipment.Callback.Get,
  ): Promise<Shipment> {
    const { orderId, ...parameters } = params;
    this.setParentId(orderId);

    return super.get(id, parameters, cb) as Promise<Shipment>;
  }

  /**
   * List order shipments
   *
   *
   *
   * @since 2.2.0
   */
  public async list(
    params?: Mollie.Shipment.Params.IList,
    cb?: Mollie.Shipment.Callback.List,
  ): Promise<List<Shipment>> {
    const { orderId, ...parameters } = params;
    this.setParentId(orderId);

    return super.list(parameters, cb) as Promise<List<Shipment>>;
  }

  // NOT AVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.cancel.name}" does not exist on the "${
        OrdersShipmentsResource.resourcePrefix
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.delete.name}" does not exist on the "${
        OrdersShipmentsResource.resourcePrefix
      }"`,
    );
  }
}
