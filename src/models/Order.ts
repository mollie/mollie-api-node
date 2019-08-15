import { isPlainObject } from 'lodash';

import Model from '../model';
import Payment from '../models/Payment';
import Refund from '../models/Refund';
import { IOrder } from '../types/order';
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
   * Returns the URL your customer should visit to make the payment for the order. This is where you should redirect
   * the customer to after creating the order.
   *
   * As long as order is still in the `'created'` state, this link can be used by your customer to pay for this order.
   * You can safely share this URL with your customer.
   *
   * Recurring, authorized, paid and finalized orders do not have a checkout URL.
   *
   * @public ✓ This method is part of the public API
   */
  public getCheckoutUrl(): string | null {
    if (undefined == this._links.checkout) {
      return null;
    } /* if (undefined != this._links.checkout) */ else {
      return (this._links.checkout as IUrl).href;
    }
  }
}
