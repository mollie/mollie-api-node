import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Page from '../../../data/page/Page';
import Capture from '../../../data/payments/captures/Capture';
import { CaptureData } from '../../../data/payments/captures/data';
import ApiError from '../../../errors/ApiError';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';
import InnerBinder from '../../InnerBinder';
import { GetParameters, IterateParameters, ListParameters } from './parameters';

function getPathSegments(paymentId: string) {
  return `payments/${paymentId}/captures`;
}

export default class PaymentCapturesBinder extends InnerBinder<CaptureData, Capture> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
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
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
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
  public page(parameters: ListParameters): Promise<Page<Capture>>;
  public page(parameters: ListParameters, callback: Callback<Page<Capture>>): void;
  public page(parameters: ListParameters) {
    if (renege(this, this.page, ...arguments)) return;
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
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
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { valuesPerMinute, paymentId: _, ...query } = parameters ?? {};
    return this.networkClient.iterate<CaptureData, Capture>(getPathSegments(paymentId), 'captures', query, valuesPerMinute);
  }
}
