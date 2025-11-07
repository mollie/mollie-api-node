import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Helper from '../../Helper';
import type Route from './Route';
import { type RouteData } from './data';

export default class RouteHelper extends Helper<RouteData, Route> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: RouteData['_links'],
  ) {
    super(networkClient, links);
  }
}
