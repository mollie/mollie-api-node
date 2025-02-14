import { runIf } from 'ruply';
import { pathSegment as ordersPathSegment } from '../../binders/orders/OrdersBinder';
import { getPathSegments as getOrderShipmentsPathSegments } from '../../binders/orders/shipments/OrderShipmentsBinder';
import { getPathSegments as getOrderRefundsPathSegments } from '../../binders/refunds/orders/OrderRefundsBinder';
import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import HelpfulIterator from '../../plumbing/iteration/HelpfulIterator';
import makeAsync from '../../plumbing/iteration/makeAsync';
import renege from '../../plumbing/renege';
import resolveIf from '../../plumbing/resolveIf';
import type Callback from '../../types/Callback';
import type Nullable from '../../types/Nullable';
import { type ThrottlingParameter } from '../../types/parameters';
import Helper from '../Helper';
import type Payment from '../payments/Payment';
import type Refund from '../refunds/Refund';
import { type RefundData } from '../refunds/data';
import type Order from './Order';
import { OrderEmbed, OrderStatus, type OrderData } from './data';
import type Shipment from './shipments/Shipment';
import { type ShipmentData } from './shipments/Shipment';

export default class OrderHelper extends Helper<OrderData, Order> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: OrderData['_links'],
    protected readonly embedded: Order['_embedded'],
  ) {
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
    return this.links.checkout?.href ?? null;
  }

  /**
   * Returns the direct link to the order in the Mollie Dashboard.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=_links/dashboard#response
   * @since 4.0.0
   */
  public getDashboardUrl(): string {
    return this.links.dashboard.href;
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
    return (
      resolveIf(this.embedded?.payments) ??
      // Getting the payments for an order is an odd case, in the sense that the Mollie API only supports it partially.
      // The Mollie API will embed the payments in an order if requested ‒ but unlike with other "embeddables", there
      // is no endpoint to get those payments directly. Therefore, the line below rerequests this order, this time with
      // payments embedded.
      this.networkClient.get<OrderData, Order>(`${ordersPathSegment}/${this.id}`, { embed: [OrderEmbed.payments] }).then(order => order.getPayments())
    );
  }

  /**
   * Returns all refunds created for this order.
   *
   * @since 3.6.0
   */
  public getRefunds(this: OrderHelper & OrderData, parameters?: ThrottlingParameter): HelpfulIterator<Refund> {
    // At the time of writing, the Mollie API does not return a link to the refunds of an order. This is why the line
    // below constructs its own URL. If the Mollie API ever starts to return such a link, use it instead for
    // consistency.
    return (
      runIf(this.embedded?.refunds, refunds => new HelpfulIterator(makeAsync(refunds[Symbol.iterator]()))) ??
      this.networkClient.iterate<RefundData, Refund>(getOrderRefundsPathSegments(this.id), 'refunds', undefined, parameters?.valuesPerMinute)
    );
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
    return resolveIf(this.embedded?.shipments) ?? this.networkClient.list<ShipmentData, Shipment>(getOrderShipmentsPathSegments(this.id), 'shipments');
  }
}
