import Model from '../model';
import { IOrder } from '../types/order';
import { IAmount } from '../types/global';
import Payment from './Payment';

/**
 * The `order` model
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
   * @public ✓ This method is part of the public API
   */
  constructor(props?: Partial<IOrder>) {
    super();

    Object.assign(this, props);

    if (this._embedded != null && typeof this._embedded === 'object') {
      if (Array.isArray(this._embedded.payments)) {
        this._embedded.payments.map((payment, key, payments) => {
          payments[key] = new Payment(payment);
        });
      }
    }
  }
}
