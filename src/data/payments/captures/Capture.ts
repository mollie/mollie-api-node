import { Amount, ApiMode, Links, Url } from '../../global';
import Model from '../../Model';
import Seal from '../../../types/Seal';
import commonHelpers from '../../commonHelpers';

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
   * The amount captured.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=amount#response
   */
  amount: Amount;
  /**
   * This optional field will contain the amount that will be settled to your account, converted to the currency your account is settled in. It follows the same syntax as the `amount` property.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=settlementAmount#response
   */
  settlementAmount: Amount;
  /**
   * The unique identifier of the payment this capture was created for, for example: `tr_7UhSN1zuXS`. The full payment object can be retrieved via the `payment` URL in the `_links` object.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=paymentId#response
   */
  paymentId: string;
  /**
   * The unique identifier of the shipment that triggered the creation of this capture, for example: `shp_3wmsgCJN4U`. The full shipment object can be retrieved via the `shipment` URL in the `_links`
   * object.
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-capture?path=shipmentId#response
   */
  shipmentId?: string;
  /**
   * The unique identifier of the settlement this capture was settled with, for example: `stl_jDk30akdN`. The full settlement object can be retrieved via the `capture` URL in the `_links` object.
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
}

type Capture = Seal<CaptureData, typeof commonHelpers>;

export default Capture;

export interface CaptureLinks extends Links {
  payment: Url;
  shipment?: Url;
  settlement?: Url;
}

export function injectPrototypes(input: CaptureData): Capture {
  return Object.assign(Object.create(commonHelpers), input);
}
