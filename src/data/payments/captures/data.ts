import { type Amount, type ApiMode, type Links, type Url } from '../../global';
import type Model from '../../Model';
import type { PaymentData } from '../data';

export interface CaptureData extends Model<'capture'> {
  /**
   * The mode used to create this capture.
   *
   * Possible values: `live` `test`
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=mode#response
   */
  mode: ApiMode;
  /**
   * The description of the capture.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=description#response
   */
  description: string;
  /**
   * The amount captured. If no amount is provided, the full authorized amount is captured.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=amount#response
   */
  amount: Amount;
  /**
   * This optional field will contain the approximate amount that will be settled to your account, converted to the currency your account is settled in.
   *
   * Since the field contains an estimated amount during capture processing, it may change over time. To retrieve accurate settlement amounts we recommend using the List balance transactions endpoint instead.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=settlementAmount#response
   */
  settlementAmount: Amount;
  /**
   * The capture's status.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=status#response
   */
  status: CaptureStatus;
  /**
   * Provide any data you like, for example a string or a JSON object. We will save the data alongside the entity. Whenever you fetch the entity with our API, we will also include the metadata.
   * You can use up to approximately 1kB.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=metadata#response
   */
  metadata: unknown;
  /**
   * The unique identifier of the payment this capture was created for, for example: `tr_7UhSN1zuXS`. The full payment object can be retrieved via the `payment` URL in the `_links` object.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=paymentId#response
   */
  paymentId: string;
  /**
   * The unique identifier of the shipment that triggered the creation of this capture, if applicable. For example: `shp_3wmsgCJN4U`.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=shipmentId#response
   */
  shipmentId?: string;
  /**
   * The identifier referring to the settlement this capture was settled with. For example, `stl_BkEjN2eBb`. This field is omitted if the capture is not settled (yet).
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=settlementId#response
   */
  settlementId?: string;
  /**
   * The capture's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=createdAt#response
   */
  createdAt: string;
  /**
   * An object with several URL objects relevant to the capture. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=_links#response
   */
  _links: CaptureLinks;
  _embedded?: {
    payment?: Omit<PaymentData, '_embedded'>;
  };
}

export enum CaptureStatus {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

export enum CaptureInclude {
  payment = 'payment',
}

interface CaptureLinks extends Links {
  /**
   * The API resource URL of the payment the capture belongs to.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=_links/payment#response
   */
  payment: Url;
  /**
   * The API resource URL of the shipment that triggered the capture to be created.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=_links/shipment#response
   */
  shipment?: Url;
  /**
   * The API resource URL of the settlement this capture has been settled with. Not present if not yet settled.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=_links/settlement#response
   */
  settlement?: Url;
}
