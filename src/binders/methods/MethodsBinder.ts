import List from '../../data/list/List';
import { MethodData } from '../../data/methods/data';
import Method from '../../data/methods/Method';
import renege from '../../plumbing/renege';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import Callback from '../../types/Callback';
import Binder from '../Binder';
import { GetParameters, ListParameters } from './parameters';

const pathSegment = 'methods';

export default class MethodsBinder extends Binder<MethodData, Method> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all enabled payment methods. The results are not paginated.
   *
   * -   For test mode, payment methods are returned that are enabled in the Dashboard (or the activation is pending).
   * -   For live mode, payment methods are returned that have been activated on your account and have been enabled in the Dashboard.
   *
   * New payment methods can be activated via the Enable payment method endpoint in the Profiles API.
   *
   * When using the `first` sequence type, methods will be returned if they can be used as a first payment in a recurring sequence and if they are enabled in the Dashboard.
   *
   * When using the `recurring` sequence type, payment methods that can be used for recurring payments or subscriptions will be returned. Enabling / disabling methods in the dashboard does not affect
   * how they can be used for recurring payments.
   *
   * @since 2.0.0
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   */
  public all: MethodsBinder['page'] = this.page;
  /**
   * Retrieve all enabled payment methods. The results are not paginated.
   *
   * -   For test mode, payment methods are returned that are enabled in the Dashboard (or the activation is pending).
   * -   For live mode, payment methods are returned that have been activated on your account and have been enabled in the Dashboard.
   *
   * New payment methods can be activated via the Enable payment method endpoint in the Profiles API.
   *
   * When using the `first` sequence type, methods will be returned if they can be used as a first payment in a recurring sequence and if they are enabled in the Dashboard.
   *
   * When using the `recurring` sequence type, payment methods that can be used for recurring payments or subscriptions will be returned. Enabling / disabling methods in the dashboard does not affect
   * how they can be used for recurring payments.
   *
   * @since 3.0.0
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   */
  public list: MethodsBinder['page'] = this.page;

  /**
   * Retrieve a single method by its ID. Note that if a method is not available on the website profile a status `404 Not found` is returned. When the method is not enabled, a status `403 Forbidden` is
   * returned. You can enable payments methods via the Enable payment method endpoint in the Profiles API, or via your [Mollie Dashboard](https://www.mollie.com/dashboard).
   *
   * If you do not know the method's ID, you can use the methods list endpoint to retrieve all payment methods that are available.
   *
   * Additionally, it is possible to check if Wallets such as Apple Pay are enabled by passing the wallet ID (`applepay`) as the method ID.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method
   */
  public get(id: string, parameters?: GetParameters): Promise<Method>;
  public get(id: string, parameters: GetParameters, callback: Callback<Method>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    return this.networkClient.get(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Retrieve all enabled payment methods. The results are not paginated.
   *
   * -   For test mode, payment methods are returned that are enabled in the Dashboard (or the activation is pending).
   * -   For live mode, payment methods are returned that have been activated on your account and have been enabled in the Dashboard.
   *
   * New payment methods can be activated via the Enable payment method endpoint in the Profiles API.
   *
   * When using the `first` sequence type, methods will be returned if they can be used as a first payment in a recurring sequence and if they are enabled in the Dashboard.
   *
   * When using the `recurring` sequence type, payment methods that can be used for recurring payments or subscriptions will be returned. Enabling / disabling methods in the dashboard does not affect
   * how they can be used for recurring payments.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   */
  public page(parameters?: ListParameters): Promise<List<Method>>;
  public page(parameters: ListParameters, callback: Callback<List<Method>>): void;
  public page(parameters: ListParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.list<MethodData, Method>(pathSegment, 'methods', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }
}
