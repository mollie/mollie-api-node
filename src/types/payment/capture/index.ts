import { ApiMode, IAmount, ILinks, IUrl } from '../../global';

/**
 * Capture Response object.
 *
 * @param resource - Indicates the response contains a capture object. Will always contain `capture` for this endpoint.
 * @param id - The capture’s unique identifier, for example `cpt_4qqhO89gsT`.
 * @param mode - The mode used to create this capture.
 * @param amount - The amount captured.
 * @param settlementAmount - This optional field will contain the amount that will be settled to your account, converted
 *                           to the currency your account is settled in. It follows the same syntax as the `amount` property.
 * @param paymentId - The unique identifier of the payment this capture was created for, for example: `tr_7UhSN1zuXS`.
 *                    The full payment object can be retrieved via the `payment` URL in the `_links` object.
 * @param shipmentId - The unique identifier of the shipment that triggered the creation of this capture, for example:
 *                     `shp_3wmsgCJN4U`. The full shipment object can be retrieved via the `shipment` URL in the
 *                     `_links` object.
 * @param settlementId - The unique identifier of the settlement this capture was settled with, for example:
 *                       `stl_jDk30akdN`. The full settlement object can be retrieved via the `capture` URL in the
 *                       `_links` object.
 * @param createdAt - The capture’s date and time of creation, in ISO 8601 format.
 * @param _links - An object with several URL objects relevant to the capture. Every URL object will contain an `href`
 *                 and a `type` field.
 *
 * @see https://docs.mollie.com/reference/v2/captures-api/get-capture
 */
export interface ICapture {
  resource: string;
  id: string;
  mode: ApiMode;
  amount: IAmount;
  settlementAmount: IAmount;
  paymentId: string;
  shipmentId?: string;
  settlementId?: string;
  createdAt: string;
  _links: ICaptureLinks;
}

export interface ICaptureLinks extends ILinks {
  payment: IUrl;
  shipment?: IUrl;
  settlement?: IUrl;
}
