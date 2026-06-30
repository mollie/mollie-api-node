import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Page from '../../../data/page/Page';
import type Capture from '../../../data/payments/captures/Capture';
import { type CaptureData } from '../../../data/payments/captures/data';
import alias from '../../../plumbing/alias';
import assertWellFormedId from '../../../plumbing/assertWellFormedId';
import foldParameters from '../../../plumbing/foldParameters';
import renege from '../../../plumbing/renege';
import withParameterDefaults from '../../../plumbing/withParameterDefaults';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type CreateParameters, type GetParameters, type IterateParameters, type PageParameters } from './parameters';

function getPathSegments(paymentId: string) {
  return `payments/${paymentId}/captures`;
}

export default class PaymentCapturesBinder extends Binder<CaptureData, Capture> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    withParameterDefaults(this, networkClient, { get: ['testmode'], page: ['testmode'], iterate: ['testmode'] });
    alias(this, { page: ['all', 'list'] });
  }

  /**
   * Capture an *authorized* payment.
   *
   * Some payment methods allow you to first collect a customer's authorization, and capture the amount at a later point.
   *
   * By default, Mollie captures payments automatically. If however you configured your payment with `captureMode: manual`, you can capture the payment using this endpoint after having collected the customer's authorization.
   *
   * @since 4.1.0
   * @see https://docs.mollie.com/reference/create-capture
   */
  public create(parameters: CreateParameters): Promise<Capture>;
  public create(parameters: CreateParameters, callback: Callback<Capture>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { paymentId, ...data } = parameters;
    assertWellFormedId(paymentId, 'payment');
    return this.networkClient.post<CaptureData, Capture>(getPathSegments(paymentId), data);
  }

  /**
   * Retrieve a single payment capture by its ID and the ID of its parent payment.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/get-capture
   */
  public get(id: string, parameters: GetParameters): Promise<Capture>;
  public get(id: string, parameters: GetParameters, callback: Callback<Capture>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'capture');
    const { paymentId, ...query } = foldParameters(parameters, { embed: ['include'] });
    assertWellFormedId(paymentId, 'payment');
    return this.networkClient.get<CaptureData, Capture>(`${getPathSegments(paymentId)}/${id}`, query);
  }

  /**
   * Retrieve a list of all captures created for a specific payment.
   *
   * The results are paginated.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/list-captures
   */
  public page(parameters: PageParameters): Promise<Page<Capture>>;
  public page(parameters: PageParameters, callback: Callback<Page<Capture>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { paymentId, ...query } = foldParameters(parameters, { embed: ['include'] });
    assertWellFormedId(paymentId, 'payment');
    return this.networkClient.page<CaptureData, Capture>(getPathSegments(paymentId), 'captures', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve a list of all captures created for a specific payment.
   *
   * The results are paginated.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/list-captures
   */
  public iterate(parameters: IterateParameters) {
    const { paymentId, valuesPerMinute, ...query } = foldParameters(parameters, { embed: ['include'] });
    assertWellFormedId(paymentId, 'payment');
    return this.networkClient.iterate<CaptureData, Capture>(getPathSegments(paymentId), 'captures', query, valuesPerMinute);
  }
}
