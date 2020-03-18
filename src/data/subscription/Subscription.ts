import { SubscriptionData } from './data';
import subscriptionHelpers from './helpers';
import Seal from '../../types/Seal';

type Subscription = Seal<SubscriptionData, typeof subscriptionHelpers>;

export default Subscription;

export function injectPrototypes(input: SubscriptionData): Subscription {
  return Object.assign(Object.create(subscriptionHelpers), input);
}
