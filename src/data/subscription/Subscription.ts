import { SubscriptionData } from './data';
import Seal from '../../types/Seal';
import SubscriptionHelper from './SubscriptionHelper';
import TransformingNetworkClient from '../../TransformingNetworkClient';

type Subscription = Seal<SubscriptionData, SubscriptionHelper>;

export default Subscription;

export function transform(networkClient: TransformingNetworkClient, input: SubscriptionData): Subscription {
  return Object.assign(new SubscriptionHelper(networkClient, input._links), input);
}
