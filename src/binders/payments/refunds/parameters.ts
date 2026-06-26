import { type RefundData, type RefundEmbed } from '../../../data/refunds/data';
import { type IdempotencyParameter, type PaginationParameters, type TestModeParameter, type ThrottlingParameter } from '../../../types/parameters';
import type PickOptional from '../../../types/PickOptional';

interface ContextParameters extends TestModeParameter {
  paymentId: string;
}

export type CreateParameters = ContextParameters &
  Pick<RefundData, 'amount'> &
  PickOptional<RefundData, 'description' | 'metadata' | 'routingReversals'> &
  IdempotencyParameter & {
    /**
     * *This feature is only available to marketplace operators.*
     *
     * With Mollie Connect you can charge fees on payments that your app is processing on behalf of other Mollie merchants, by providing the `routing` object during [payment
     * creation](https://docs.mollie.com/reference/create-payment).
     *
     * When creating refunds for these *routed* payments, by default the full amount is deducted from your balance.
     *
     * If you want to pull back the funds that were routed to the connected merchant(s), you can set this parameter to `true` when issuing a full refund.
     *
     * For more fine-grained control and for partial refunds, use the `routingReversals` parameter instead.
     *
     * @see https://docs.mollie.com/reference/create-refund?path=reverseRouting#parameters
     */
    reverseRouting?: boolean;
  };

export type GetParameters = ContextParameters & {
  /**
   * This endpoint allows embedding related API items by appending the following values via the `embed` query string parameter:
   *
   * - `payment`: Embed the payment related to this refund.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=embed#parameters
   */
  embed?: RefundEmbed[];
};

export type PageParameters = ContextParameters &
  PaginationParameters & {
    /**
     * This endpoint allows embedding related API items by appending the following values via the `embed` query string parameter:
     *
     * - `payment`: Embed the payment related to this refund.
     *
     * @see https://docs.mollie.com/reference/list-refunds?path=embed#parameters
     */
    embed?: RefundEmbed[];
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;

export type CancelParameters = ContextParameters & IdempotencyParameter;
