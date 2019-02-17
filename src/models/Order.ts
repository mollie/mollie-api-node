import { isPlainObject } from 'lodash';

import Model from '@root/model';
import Payment from '@models/Payment';
import Refund from '@models/Refund';
import { IOrder } from '@mollie-types/order';
import { IAmount } from '@mollie-types/global';

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
}
