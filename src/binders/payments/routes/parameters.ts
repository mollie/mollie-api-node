import { type RouteData } from '../../../data/payments/routes/data';
import { type IdempotencyParameter, type PaginationParameters, type ThrottlingParameter } from '../../../types/parameters';

interface ContextParameters {
  /**
   * The ID of the payment to create a route for.
   *
   * @see https://docs.mollie.com/reference/payment-create-route
   */
  paymentId: string;
  /**
   * Set this to `true` to create a test mode route.
   *
   * @see https://docs.mollie.com/reference/payment-create-route?path=testmode#body-params
   */
  testmode?: boolean;
}

export type CreateParameters = ContextParameters & Pick<RouteData, 'amount' | 'description' | 'destination'> & IdempotencyParameter;

export type PageParameters = ContextParameters & PaginationParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
