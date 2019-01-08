import { IAmount, ILinks, IUrl } from '../global';
import { RefundStatus } from '../refund';
import { IOrderLine } from '../orderline';

/**
 * Payment Refund object
 *
 * @param resource - Indicates the response contains a refund object.
 *                   Will always contain refund for this endpoint.
 * @param id - The refund’s unique identifier, for example `re_4qqhO89gsT`.
 * @param amount - The amount refunded to your customer with this refund.
 * @param settlementAmount - This optional field will contain the amount
 *                           that will be deducted from your account balance,
 *                           converted to the currency your account is
 *                           settled in. It follows the same syntax as
 *                           the amount property. Note that for refunds,
 *                           the value key of settlementAmount will be negative.
 *                           Any amounts not settled by Mollie will not be
 *                           reflected in this amount, e.g. PayPal refunds.
 *                           Queued refunds in non EUR currencies will not
 *                           have a settlement amount until they become pending.
 * @param description - The description of the refund that may be shown to your
 *                      customer, depending on the payment method used.
 * @param status - Since refunds may be delayed for certain payment methods,
 *                 the refund carries a status field.
 * @param lines - An array of order line objects as described in Get order.
 *                The lines will show the `quantity`, `discountAmount`, `vatAmount`
 *                and `totalAmount` refunded. If the line was partially refunded,
 *                these values will be different from the values in response
 *                from the Get order API. Only available if the refund was
 *                created via the Create Order Refund API.
 * @param createdAt - The date and time the refund was issued, in ISO 8601 format.
 * @param paymentId - The unique identifier of the payment this refund was created
 *                    for. For example: `tr_7UhSN1zuXS`. The full payment object
 *                    can be retrieved via the payment URL in the `_links` object.
 * @param orderId - The unique identifier of the order this refund was created for.
 *                  For example: `ord_8wmqcHMN4U`.
 *                  Not present if the refund was not created for an order.
 *                  The full order object can be retrieved via the order URL
 *                  in the `_links` object.
 * @param createdAt - The date and time the refund was issued, in ISO 8601 format.
 * @param _links - An object with several URL objects relevant to the refund.
 *
 * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund
 */
export interface IPaymentRefund {
  resource: string;
  id: string;
  amount: IAmount;
  settlementAmount?: IAmount;
  description: string;
  status: RefundStatus;
  lines: Array<IOrderLine>;
  paymentId: string;
  orderId?: string;
  createdAt: string;
  _links: ILinks;
}

/**
 * Payment Refund _links object
 *
 * @param payment - The API resource URL of the payment the refund belongs to.
 * @param settlement - The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.
 * @param order - The API resource URL of the order the refund belongs to. Not present if the refund does not belong to an order.
 */
export interface IPaymentRefundLinks extends ILinks {
  payment: IUrl;
  settlement: IUrl;
  order: IUrl;
}
