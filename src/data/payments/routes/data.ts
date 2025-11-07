import { type Amount, type Links } from '../../global';
import type Model from '../../Model';

export interface RouteData extends Model<'route'> {
  /**
   * The unique identifier of the payment. For example: `tr_5B8cwPMGnU6qLbRvo7qEZo`.
   * The full payment object can be retrieved via the payment URL in the `_links` object.
   *
   * @see https://docs.mollie.com/reference/payment-create-route?path=paymentId#response
   */
  paymentId: string;
  /**
   * The amount of the route. That amount that will be routed to the specified destination.
   *
   * @see https://docs.mollie.com/reference/payment-create-route?path=amount#response
   */
  amount: Amount;
  /**
   * The description of the route. This description is shown in the reports.
   *
   * @see https://docs.mollie.com/reference/payment-create-route?path=description#response
   */
  description: string;
  /**
   * The destination of the route.
   *
   * @see https://docs.mollie.com/reference/payment-create-route?path=destination#response
   */
  destination: RouteDestination;
  /**
   * The route's date and time of creation, in ISO 8601 format.
   *
   * @see https://docs.mollie.com/reference/payment-list-routes?path=createdAt#response
   */
  createdAt?: string;
  /**
   * An object with several relevant URLs. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/payment-create-route?path=_links#response
   */
  _links: Links;
}

export interface RouteDestination {
  /**
   * The type of destination. Currently only the destination type `organization` is supported.
   *
   * @see https://docs.mollie.com/reference/payment-create-route?path=destination/type#request
   */
  type: 'organization';
  /**
   * Required for destination type `organization`. The ID of the connected organization the funds should be routed to.
   *
   * @see https://docs.mollie.com/reference/payment-create-route?path=destination/organizationId#request
   */
  organizationId: string;
}
