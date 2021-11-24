import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Seal from '../../types/Seal';
import { PaymentLinkData } from './data';
import PaymentLinkHelper from './PaymentLinkHelper';

type PaymentLink = Seal<Omit<PaymentLinkData, '_links'>, PaymentLinkHelper>;

export default PaymentLink;

export function transform(networkClient: TransformingNetworkClient, input: PaymentLinkData): PaymentLink {
  return Object.assign(Object.create(new PaymentLinkHelper(networkClient, input._links)), input);
}
