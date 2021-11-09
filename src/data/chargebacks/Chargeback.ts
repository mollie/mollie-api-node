import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Seal from '../../types/Seal';
import { Amount, Links, Url } from '../global';
import Helper from '../Helper';
import Model from '../Model';
import { PaymentData } from '../payments/data';
import Payment, { transform as transformPayment } from '../payments/Payment';
import ChargebackHelper from './ChargebackHelper';

export interface ChargebackData extends Model<'chargeback'> {
  /**
   * The amount charged back by the consumer.
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback?path=amount#response
   */
  amount: Amount;
  /**
   * This optional field will contain the amount that will be deducted from your account, converted to the currency your account is settled in. It follows the same syntax as the `amount` property.
   *
   * Note that for chargebacks, the `value` key of `settlementAmount` will be negative.
   *
   * Any amounts not settled by Mollie will not be reflected in this amount, e.g. PayPal chargebacks.
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback?path=settlementAmount#response
   */
  settlementAmount: Amount;
  /**
   * The date and time the chargeback was issued, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback?path=createdAt#response
   */
  createdAt: string;
  /**
   * The date and time the chargeback was reversed if applicable, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback?path=reversedAt#response
   */
  reversedAt: string;
  /**
   * The unique identifier of the payment this chargeback was issued for. For example: `tr_7UhSN1zuXS`. The full payment object can be retrieved via the `payment` URL in the `_links` object.
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback?path=paymentId#response
   */
  paymentId: string;
  _embedded?: {
    payment?: Omit<PaymentData, '_embedded'>;
  };
  /**
   * An object with several URL objects relevant to the chargeback. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback?path=_links#response
   */
  _links: ChargebackLinks;
}

type Chargeback = Seal<
  Omit<ChargebackData, '_embedded'> & {
    _embedded?: {
      payment?: Payment;
    };
  },
  Helper<ChargebackData, Chargeback>
>;

export default Chargeback;

export interface ChargebackLinks extends Links {
  /**
   * The API resource URL of the payment this chargeback belongs to.
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback?path=_links/payment#response
   */
  payment: Url;
  /**
   * The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback?path=_links/settlement#response
   */
  settlement?: Url;
}

export enum ChargebackEmbed {
  payment = 'payment',
}

export function transform(networkClient: TransformingNetworkClient, input: ChargebackData): Chargeback {
  let _embedded: Chargeback['_embedded'];
  if (input._embedded != undefined) {
    _embedded = {};
    if (input._embedded.payment != undefined) {
      _embedded.payment = transformPayment(networkClient, input._embedded.payment);
    }
  }
  return Object.assign(Object.create(new ChargebackHelper(networkClient, input._links, _embedded)), input, { _embedded });
}
