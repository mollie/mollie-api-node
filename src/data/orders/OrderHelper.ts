import { OrderData, OrderEmbed, OrderStatus } from './data';
import Helper from '../Helper';
import { getPathSegments as getOrderRefundsPathSegments } from '../../binders/refunds/orders/OrderRefundsBinder';
import Nullable from '../../types/Nullable';
import Order from './Order';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import { RefundData } from '../refunds/data';
import Refund from '../refunds/Refund';
import resolveIf from '../../plumbing/resolveIf';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';
import Shipment, { ShipmentData } from './shipments/Shipment';
import { getPathSegments as getOrderShipmentsPathSegments } from '../../binders/orders/shipments/OrderShipmentsBinder';
import { pathSegment as ordersPathSegment } from '../../binders/orders/OrdersBinder';
import Payment from '../payments/Payment';

export default class OrderHelper extends Helper<OrderData, Order> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: OrderData['_links'], protected readonly embedded: Order['_embedded']) {
    super(networkClient, links);
  }

  /**
   * Returns whether the order has been created, but nothing else has happened yet.
   */
  public isCreated(this: OrderData): boolean {
    return this.status == OrderStatus.created;
  }

  /**
   * Returns whether the order's payment is successfully completed with a payment method that does not support
   * authorizations.
   */
  public isPaid(this: OrderData): boolean {
    return this.status == OrderStatus.paid;
  }

  /**
   * Returns whether the order's payment is successfully completed with a payment method that does support
   * authorizations. The money will only be transferred once a shipment is created for the order.
   */
  public isAuthorized(this: OrderData): boolean {
    return this.status == OrderStatus.authorized;
  }

  /**
   * Returns whether the order has been canceled.
   */
  public isCanceled(this: OrderData): boolean {
    return this.status == OrderStatus.canceled;
  }

  /**
   * Returns whether the first order line or part of an order line has started shipping. When the order is in this
   * state, it means that your order is partially shipped.
   */
  public isShipping(this: OrderData): boolean {
    return this.status == OrderStatus.shipping;
  }

  /**
   * Returns whether the order has been completed.
   */
  public isCompleted(this: OrderData): boolean {
    return this.status == OrderStatus.completed;
  }

  /**
   * Returns whether the order has expired.
   */
  public isExpired(this: OrderData): boolean {
    return this.status == OrderStatus.expired;
  }

  /**
   * Returns whether the the payment supplier is manually checking the order.
   */
  public isPending(this: OrderData): boolean {
    return this.status == OrderStatus.pending;
  }

  /**
   * Returns the URL your customer should visit to make the payment for the order. This is where you should redirect
   * the customer to after creating the order.
   *
   * As long as the order is still in the `'created'` state, this link can be used by your customer to pay for this
   * order. You can safely share this URL with your customer.
   *
   * Recurring, authorized, paid and finalized orders do not have a checkout URL.
   */
  public getCheckoutUrl(): Nullable<string> {
    if (this.links.checkout == undefined) {
      return null;
    }
    return this.links.checkout.href;
  }

  /**
   * Returns all payments created for the order.
   *
   * @since 3.6.0
   */
  public getPayments(): Promise<Array<Payment>>;
  public getPayments(callback: Callback<Array<Payment>>): void;
  public getPayments(this: OrderHelper & OrderData) {
    if (renege(this, this.getPayments, ...arguments)) return;
    if (this.embedded?.payments != undefined) {
      return Promise.resolve(this.embedded.payments);
    }
    // Getting the payments for an order is an odd case, in the sense that the Mollie API only supports it partially.
    // The Mollie API will embed the payments in an order if requested ‒ but unlike with other "embeddables", there is
    // no endpoint to get those payments directly. Therefore, the line below rerequests this order, this time with
    // payments embedded.
    return this.networkClient.get<OrderData, Order>(`${ordersPathSegment}/${this.id}`, { embed: [OrderEmbed.payments] }).then(order => order.getPayments());
  }

  /**
   * Returns all refunds created for this order.
   *
   * @since 3.6.0
   */
  public getRefunds(): Promise<Array<Refund>>;
  public getRefunds(callback: Callback<Array<Refund>>): void;
  public getRefunds(this: OrderHelper & OrderData) {
    if (renege(this, this.getRefunds, ...arguments)) return;
    // At the time of writing, the Mollie API does not return a link to the refunds of an order. This is why the line
    // below constructs its own URL. If the Mollie API ever starts to return such a link, use it instead for
    // consistency.
    return resolveIf(this.embedded?.refunds) ?? this.networkClient.listPlain<RefundData, Refund>(getOrderRefundsPathSegments(this.id), 'refunds');
  }

  /**
   * Returns all shipments created for this order.
   *
   * @since 3.6.0
   */
  public getShipments(): Promise<Array<Shipment>>;
  public getShipments(callback: Callback<Array<Shipment>>): void;
  public getShipments(this: OrderHelper & OrderData) {
    if (renege(this, this.getShipments, ...arguments)) return;
    // At the time of writing, the Mollie API does not return a link to the shipments of an order. This is why the line
    // below constructs its own URL. If the Mollie API ever starts to return such a link, use it instead for
    // consistency.
    return resolveIf(this.embedded?.shipments) ?? this.networkClient.listPlain<ShipmentData, Shipment>(getOrderShipmentsPathSegments(this.id), 'shipments');
  }
}
