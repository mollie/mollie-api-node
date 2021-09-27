import { SubscriptionData } from './data';
import Seal from '../../types/Seal';
import subscriptionHelpers from './helpers';

type Subscription = Seal<SubscriptionData, typeof subscriptionHelpers>;

export default Subscription;

export function transform(input: SubscriptionData): Subscription {
  return Object.assign(Object.create(subscriptionHelpers), input);
}
