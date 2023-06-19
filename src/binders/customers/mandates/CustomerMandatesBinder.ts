import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import { MandateData } from '../../../data/customers/mandates/data';
import Mandate from '../../../data/customers/mandates/Mandate';
import Page from '../../../data/page/Page';
import ApiError from '../../../errors/ApiError';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';
import InnerBinder from '../../InnerBinder';
import { CreateParameters, GetParameters, IterateParameters, PageParameters, RevokeParameters } from './parameters';

function getPathSegments(customerId: string) {
  return `customers/${customerId}/mandates`;
}

export default class CustomerMandatesBinder extends InnerBinder<MandateData, Mandate> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Create a mandate for a specific customer. Mandates allow you to charge a customer's credit card, PayPal account or bank account recurrently.
   *
   * It is only possible to create mandates for IBANs and PayPal billing agreements with this endpoint. To create mandates for credit cards, have your customers perform a 'first payment' with their
   * credit card.
   *
   * @since 1.2.0
   * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate
   */
  public create(parameters: CreateParameters): Promise<Mandate>;
  public create(parameters: CreateParameters, callback: Callback<Mandate>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const customerId = this.getParentId(parameters.customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...data } = parameters;
    return this.networkClient.post<MandateData, Mandate>(getPathSegments(customerId), data);
  }

  /**
   * Retrieve a mandate by its ID and its customer's ID. The mandate will either contain IBAN or credit card details, depending on the type of mandate.
   *
   * @since 1.2.0
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate
   */
  public get(id: string, parameters: GetParameters): Promise<Mandate>;
  public get(id: string, parameters: GetParameters, callback: Callback<Mandate>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'mandate')) {
      throw new ApiError('The customers_mandate id is invalid');
    }
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters ?? {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...query } = parameters ?? {};
    return this.networkClient.get<MandateData, Mandate>(`${getPathSegments(customerId)}/${id}`, query);
  }

  /**
   * Retrieve all mandates for the given `customerId`, ordered from newest to oldest.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   */
  public page(parameters: PageParameters): Promise<Page<Mandate>>;
  public page(parameters: PageParameters, callback: Callback<Page<Mandate>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters ?? {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...query } = parameters ?? {};
    return this.networkClient.page<MandateData, Mandate>(getPathSegments(customerId), 'mandates', query).then(result => this.injectPaginationHelpers(result, this.page, parameters ?? {}));
  }

  /**
   * Retrieve all mandates for the given `customerId`, ordered from newest to oldest.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   */
  public iterate(parameters: IterateParameters) {
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters ?? {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { valuesPerMinute, customerId: _, ...query } = parameters ?? {};
    return this.networkClient.iterate<MandateData, Mandate>(getPathSegments(customerId), 'mandates', query, valuesPerMinute);
  }

  /**
   * Revoke a customer's mandate. You will no longer be able to charge the consumer's bank account or credit card with this mandate and all connected subscriptions will be canceled.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
   */
  public revoke(id: string, parameters: RevokeParameters): Promise<true>;
  public revoke(id: string, parameters: RevokeParameters, callback: Callback<true>): void;
  public revoke(id: string, parameters: RevokeParameters) {
    if (renege(this, this.revoke, ...arguments)) return;
    if (!checkId(id, 'mandate')) {
      throw new ApiError('The customers_mandate id is invalid');
    }
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters ?? {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer is invalid');
    }
    const { customerId: _, ...context } = parameters ?? {};
    return this.networkClient.delete<MandateData, true>(`${getPathSegments(customerId)}/${id}`, context);
  }
}
