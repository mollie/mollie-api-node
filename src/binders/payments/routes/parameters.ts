import { type RouteData } from '../../../data/payments/routes/data';
import { type IdempotencyParameter, type PaginationParameters, type TestModeParameter, type ThrottlingParameter } from '../../../types/parameters';

interface ContextParameters extends TestModeParameter {
  /**
   * The ID of the payment to create a route for.
   *
   * @see https://docs.mollie.com/reference/payment-create-route
   */
  paymentId: string;
}

export type CreateParameters = ContextParameters & Pick<RouteData, 'amount' | 'description' | 'destination'> & IdempotencyParameter;

export type PageParameters = ContextParameters & PaginationParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
