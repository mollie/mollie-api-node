/**
 * List Refunds parameters.
 *
 * @param from - Offset the result set to the refund with this ID. The refund with this ID is included in the result set as well.
 * @param limit - The number of refunds to return (with a maximum of 250).
 *
 * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
 */
export interface IListParams {
  from?: string;
  limit: number;
}
