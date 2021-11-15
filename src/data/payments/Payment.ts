import TransformingNetworkClient from '../../TransformingNetworkClient';
import Seal from '../../types/Seal';
import Chargeback, { transform as transformChargeback } from '../chargebacks/Chargeback';
import Refund, { transform as transformRefund } from '../refunds/Refund';
import { PaymentData } from './data';
import PaymentHelper from './PaymentHelper';

type Payment = Seal<
  Omit<PaymentData, '_embedded'> & {
    _embedded?: {
      refunds?: Refund[];
      chargebacks?: Chargeback[];
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
  return Object.assign(Object.create(new PaymentHelper(networkClient, input._links, _embedded)), input, { _embedded });
}
