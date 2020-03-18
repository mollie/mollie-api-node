import { Amount, Links, Url } from '../global';
import Model from '../Model';
import commonHelpers from '../commonHelpers';
import Seal from '../../types/Seal';

/**
 * Chargeback Response object.
 *
 * @param resource - Indicates the response contains a Chargeback object.
 *                   Will always contain `chargeback` for this endpoint.
 * @param id - The chargeback’s unique identifier, for example `chb_n9z0tp`.
 * @param amount - The amount charged back by the consumer.
 * @param settlementAmount - This optional field will contain the amount that will be deducted from your account,
 *                           converted to the currency your account is settled in. It follows the same syntax as
 *                           the `amount` property. Note that for chargebacks, the `value` key of `settlementAmount`
 *                           will be negative. Any amounts not settled by Mollie will not be reflected in this amount,
 *                           e.g. PayPal chargebacks.
 * @param createdAt - The date and time the chargeback was issued, in ISO 8601 format.
 * @param reversedAt - The date and time the chargeback was reversed if applicable, in ISO 8601 format.
 * @param paymentId - The unique identifier of the payment this chargeback was issued for. For example: `tr_7UhSN1zuXS`.
 *                    The full payment object can be retrieved via the `payment` URL in the `_links` object.
 * @param _links - An object with several URL objects relevant to the chargeback.
 *
 * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback
 */
export interface ChargebackData extends Model<'chargeback'> {
  amount: Amount;
  settlementAmount: Amount;
  createdAt: string;
  reversedAt: string;
  paymentId: string;
  _links: ChargebackLinks;
}

type Chargeback = Seal<ChargebackData, typeof commonHelpers>;

export default Chargeback;

/**
 * Chargebacks _links object
 *
 * @param payment - The API resource URL of the payment this chargeback belongs to.
 * @param settlement - The API resource URL of the settlement this payment has been settled with. Not present if not
 *                     yet settled.
 */
export interface ChargebackLinks extends Links {
  payment: Url;
  settlement?: Url;
}

export function injectPrototypes(input: ChargebackData): Chargeback {
  return Object.assign(Object.create(commonHelpers), input);
}
