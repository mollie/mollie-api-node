import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Page from '../../../data/page/Page';
import type Route from '../../../data/payments/routes/Route';
import { type RouteData } from '../../../data/payments/routes/data';
import alias from '../../../plumbing/alias';
import assertWellFormedId from '../../../plumbing/assertWellFormedId';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type CreateParameters, type IterateParameters, type PageParameters } from './parameters';

function getPathSegments(paymentId: string) {
  return `payments/${paymentId}/routes`;
}

export default class PaymentRoutesBinder extends Binder<RouteData, Route> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    alias(this, { page: ['all', 'list'] });
  }

  /**
   * Create a route for a specific payment. The routed amount is credited to the account of your customer.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/payment-create-route
   */
  public create(parameters: CreateParameters): Promise<Route>;
  public create(parameters: CreateParameters, callback: Callback<Route>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { paymentId, ...data } = parameters;
    assertWellFormedId(paymentId, 'payment');
    return this.networkClient.post<RouteData, Route>(getPathSegments(paymentId), data);
  }

  /**
   * Retrieve a list of all routes created for a specific payment.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/payment-list-routes
   */
  public page(parameters: PageParameters): Promise<Page<Route>>;
  public page(parameters: PageParameters, callback: Callback<Page<Route>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { paymentId, ...query } = parameters;
    assertWellFormedId(paymentId, 'payment');
    return this.networkClient.page<RouteData, Route>(getPathSegments(paymentId), 'routes', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all routes for a certain payment.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/payment-list-routes
   */
  public iterate(parameters: IterateParameters) {
    const { paymentId, valuesPerMinute, ...query } = parameters;
    assertWellFormedId(paymentId, 'payment');
    return this.networkClient.iterate<RouteData, Route>(getPathSegments(paymentId), 'routes', query, valuesPerMinute);
  }
}
