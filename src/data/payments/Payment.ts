import { PaymentData } from './data';
import Chargeback, { transform as transformChargeback } from '../chargebacks/Chargeback';
import Refund, { transform as transformRefund } from '../refunds/Refund';
import Seal from '../../types/Seal';
import PaymentHelper from './PaymentHelper';
import TransformingNetworkClient from '../../TransformingNetworkClient';

type Payment = Seal<
  PaymentData & {
    _embedded?: {
      refunds?: Omit<Refund, '_embedded'>[];
      chargebacks?: Omit<Chargeback, '_embedded'>[];
    };
  },
  PaymentHelper
>;

export default Payment;

export function transform(networkClient: TransformingNetworkClient, input: PaymentData): Payment {
  let _embedded: Payment['_embedded'];
  if (input._embedded != undefined) {
    _embedded = {};
    if (input._embedded.chargebacks != undefined) {
      _embedded.chargebacks = input._embedded.chargebacks.map(transformChargeback.bind(undefined, networkClient));
    }
    if (input._embedded.refunds != undefined) {
      _embedded.refunds = input._embedded.refunds.map(transformRefund.bind(undefined, networkClient));
    }
  }
  return Object.assign(new PaymentHelper(networkClient, input._links), input, { _embedded });
}
