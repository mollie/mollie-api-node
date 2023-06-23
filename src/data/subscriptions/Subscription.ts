import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type SubscriptionData } from './data';
import SubscriptionHelper from './SubscriptionHelper';

type Subscription = Seal<SubscriptionData, SubscriptionHelper>;

export default Subscription;

export function transform(networkClient: TransformingNetworkClient, input: SubscriptionData): Subscription {
  return Object.assign(Object.create(new SubscriptionHelper(networkClient, input._links)), input);
}
