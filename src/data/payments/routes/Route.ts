import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Seal from '../../../types/Seal';
import RouteHelper from './RouteHelper';
import { type RouteData } from './data';

type Route = Seal<RouteData, RouteHelper>;

export default Route;

export function transform(networkClient: TransformingNetworkClient, input: RouteData): Route {
  return Object.assign(Object.create(new RouteHelper(networkClient, input._links)), input);
}
