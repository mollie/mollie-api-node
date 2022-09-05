import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Seal from '../../types/Seal';
import { SubscriptionData } from './data';
import SubscriptionHelper from './SubscriptionHelper';

type Subscription = Seal<SubscriptionData, SubscriptionHelper>;

export default Subscription;

export function transform(networkClient: TransformingNetworkClient, input: SubscriptionData): Subscription {
  return Object.assign(Object.create(new SubscriptionHelper(networkClient, input._links)), input);
}
