import { isPlainObject } from 'lodash';

import Model from '../model';
import Payment from '../models/Payment';
import Refund from '../models/Refund';
import { IOrder, OrderStatus } from '../types/order';
import { IAmount, IUrl } from '../types/global';

/**
 * The `Order` model
 *
 * {@link IOrder}
 */
export default class Order extends Model implements IOrder {
  public static resourcePrefix = 'ord_';

  public resource = 'order';
  public id = null;
  public amount = null;
  public profileId = null;
  public createdAt = null;
  public method = null;
  public mode = null;
  public status = null;
  public isCancelable = null;
  public billingAddress = null;
  public orderNumber = null;
  public shippingAddress = null;
  public locale = null;
  public metadata = null;
  public redirectUrl = null;
  public lines = null;
  public _links = {
    self: null,
    documentation: null,
    checkout: null,
    payment: null,
    settlement: null,
  };
  public _embedded = null;
  public webhookUrl?: string;
  public expiresAt?: string;
  public expiredAt?: string;
  public paidAt?: string;
  public authorizedAt?: string;
  public canceledAt?: string;
  public completedAt?: string;
  public amountCaptured?: IAmount | null;
  public amountRefunded?: IAmount | null;
  public consumerDateOfBirth?: string;

  /**
   * Order constructor
   *
   * @public ✓ This constructor is part of the public API
   */
  public constructor(props?: Partial<IOrder>) {
    super();

    Object.assign(this, props);

    if (isPlainObject(this._embedded)) {
      if (Array.isArray(this._embedded.payments)) {
        this._embedded.payments.forEach((payment, key, payments) => {
          // eslint-disable-next-line no-param-reassign
          payments[key] = new Payment(payment);
        });
      }
      if (Array.isArray(this._embedded.refunds)) {
        this._embedded.refunds.forEach((refund, key, refunds) => {
          // eslint-disable-next-line no-param-reassign
          refunds[key] = new Refund(refund);
        });
      }
    }
  }

  /**
   * Returns whether the order has been created, but nothing else has happened yet.
   *
   * @public ✓ This method is part of the public API
   */
  public isCreated(): boolean {
    return this.status == OrderStatus.created;
  }

  /**
   * Returns whether the order's payment is successfully completed with a payment method that does not support
   * authorizations.
   *
   * @public ✓ This method is part of the public API
   */
  public isPaid(): boolean {
    return this.status == OrderStatus.paid;
  }

  /**
   * Returns whether the order's payment is successfully completed with a payment method that does support
   * authorizations. The money will only be transferred once a shipment is created for the order.
   *
   * @public ✓ This method is part of the public API
   */
  public isAuthorized(): boolean {
    return this.status == OrderStatus.authorized;
  }

  /**
   * Returns whether the order has been canceled.
   *
   * @public ✓ This method is part of the public API
   */
  public isCanceled(): boolean {
    return this.status == OrderStatus.canceled;
  }

  /**
   * Returns whether the first order line or part of an order line has started shipping. When the order is in this
   * state, it means that your order is partially shipped.
   *
   * @public ✓ This method is part of the public API
   */
  public isShipping(): boolean {
    return this.status == OrderStatus.shipping;
  }

  /**
   * Returns whether the order has been completed.
   *
   * @public ✓ This method is part of the public API
   */
  public isCompleted(): boolean {
    return this.status == OrderStatus.completed;
  }

  /**
   * Returns whether the order has expired.
   *
   * @public ✓ This method is part of the public API
   */
  public isExpired(): boolean {
    return this.status == OrderStatus.expired;
  }

  /**
   * Returns whether the the payment supplier is manually checking the order.
   *
   * @public ✓ This method is part of the public API
   */
  public isPending(): boolean {
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
   *
   * @public ✓ This method is part of the public API
   */
  public getCheckoutUrl(): string | null {
    if (this._links.checkout == undefined) {
      return null;
    }
    return (this._links.checkout as IUrl).href;
  }
}
