import { PaymentData } from './data';
import Chargeback, { transform as transformChargeback } from '../chargebacks/Chargeback';
import Refund, { transform as transformRefund } from '../refunds/Refund';
import Seal from '../../types/Seal';
import paymentHelpers from './helpers';

type Payment = Seal<
  PaymentData & {
    _embedded?: {
      refunds?: Omit<Refund, '_embedded'>[];
      chargebacks?: Omit<Chargeback, '_embedded'>[];
    };
  },
  typeof paymentHelpers
>;

export default Payment;

export function transform(input: PaymentData): Payment {
  let _embedded: Payment['_embedded'];
  if (input._embedded != undefined) {
    _embedded = {};
    if (input._embedded.chargebacks != undefined) {
      _embedded.chargebacks = input._embedded.chargebacks.map(transformChargeback);
    }
    if (input._embedded.refunds != undefined) {
      _embedded.refunds = input._embedded.refunds.map(transformRefund);
    }
  }
  return Object.assign(Object.create(paymentHelpers), input, { _embedded });
}
