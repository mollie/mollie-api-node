import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Page from '../../../data/page/Page';
import type Capture from '../../../data/payments/captures/Capture';
import { type CaptureData } from '../../../data/payments/captures/data';
import ApiError from '../../../errors/ApiError';
import alias from '../../../plumbing/alias';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type GetParameters, type IterateParameters, type PageParameters } from './parameters';

function getPathSegments(paymentId: string) {
  return `/payments/${paymentId}/captures`;
}

export default class PaymentCapturesBinder extends Binder<CaptureData, Capture> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    alias(this, { page: ['all', 'list'] });
  }

  /**
   * Retrieve a single capture by its ID. Note the original payment's ID is needed as well.
   *
   * Captures are used for payments that have the *authorize-then-capture* flow. The only payment methods at the moment that have this flow are **Klarna Pay now**, **Klarna Pay later** and **Klarna
   * Slice it**.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture
   */
  public get(id: string, parameters: GetParameters): Promise<Capture>;
  public get(id: string, parameters: GetParameters, callback: Callback<Capture>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'capture')) {
      throw new ApiError('The capture id is invalid');
    }
    const { paymentId, ...query } = parameters;
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.networkClient.get<CaptureData, Capture>(`${getPathSegments(paymentId)}/${id}`, query);
  }

  /**
   * Retrieve all captures for a certain payment.
   *
   * Captures are used for payments that have the *authorize-then-capture* flow. The only payment methods at the moment that have this flow are *Klarna Pay now*, *Klarna Pay later* and *Klarna Slice
   * it*.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/captures-api/list-captures
   */
  public page(parameters: PageParameters): Promise<Page<Capture>>;
  public page(parameters: PageParameters, callback: Callback<Page<Capture>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { paymentId, ...query } = parameters;
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.networkClient.page<CaptureData, Capture>(getPathSegments(paymentId), 'captures', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all captures for a certain payment.
   *
   * Captures are used for payments that have the *authorize-then-capture* flow. The only payment methods at the moment that have this flow are *Klarna Pay now*, *Klarna Pay later* and *Klarna Slice
   * it*.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/captures-api/list-captures
   */
  public iterate(parameters: IterateParameters) {
    const { paymentId, valuesPerMinute, ...query } = parameters;
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.networkClient.iterate<CaptureData, Capture>(getPathSegments(paymentId), 'captures', query, valuesPerMinute);
  }
}
