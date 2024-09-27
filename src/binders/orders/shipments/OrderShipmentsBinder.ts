import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Shipment from '../../../data/orders/shipments/Shipment';
import { type ShipmentData } from '../../../data/orders/shipments/Shipment';
import alias from '../../../plumbing/alias';
import assertWellFormedId from '../../../plumbing/assertWellFormedId';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type CreateParameters, type GetParameters, type ListParameters, type UpdateParameters } from './parameters';

export function getPathSegments(orderId: string) {
  return `orders/${orderId}/shipments`;
}

export default class OrderShipmentsBinder extends Binder<ShipmentData, Shipment> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    alias(this, { list: ['all', 'page'] });
  }

  /**
   * Create a shipment for specific order lines of an order.
   *
   * When using *Klarna Pay now*, *Klarna Pay later* and *Klarna Slice it*, using this endpoint is mandatory for the order amount to be captured. A capture will automatically be created for the
   * shipment.
   *
   * The word "shipping" is used in the figurative sense here. It can also mean that a service was provided or digital content was delivered.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/shipments-api/create-shipment
   */
  public create(parameters: CreateParameters): Promise<Shipment>;
  public create(parameters: CreateParameters, callback: Callback<Shipment>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { orderId, ...data } = parameters;
    assertWellFormedId(orderId, 'order');
    return this.networkClient.post<ShipmentData, Shipment>(getPathSegments(orderId), data);
  }

  /**
   * Retrieve a single shipment and the order lines shipped by a shipment's ID.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/shipments-api/get-shipment
   */
  public get(id: string, parameters: GetParameters): Promise<Shipment>;
  public get(id: string, parameters: GetParameters, callback: Callback<Shipment>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'shipment');
    const { orderId, ...query } = parameters;
    assertWellFormedId(orderId, 'order');
    return this.networkClient.get<ShipmentData, Shipment>(`${getPathSegments(orderId)}/${id}`, query);
  }

  /**
   * Retrieve all shipments for an order.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/shipments-api/list-shipments
   */
  public list(parameters: ListParameters): Promise<Shipment[]>;
  public list(parameters: ListParameters, callback: Callback<Shipment[]>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    const { orderId, ...query } = parameters;
    assertWellFormedId(orderId, 'order');
    return this.networkClient.list<ShipmentData, Shipment>(getPathSegments(orderId), 'shipments', query);
  }

  /**
   * This endpoint can be used to update the tracking information of a shipment.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/shipments-api/update-shipment
   */
  public update(id: string, parameters: UpdateParameters): Promise<Shipment>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Shipment>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    assertWellFormedId(id, 'shipment');
    const { orderId, ...data } = parameters;
    assertWellFormedId(orderId, 'order');
    return this.networkClient.patch<ShipmentData, Shipment>(`${getPathSegments(orderId)}/${id}`, data);
  }
}
