import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Helper from '../../Helper';
import type { PartnerStatusData } from './data';

export default class PartnerStatusHelper extends Helper<PartnerStatusData, PartnerStatusHelper> {
  constructor(networkClient: TransformingNetworkClient, links: PartnerStatusData['_links']) {
    super(networkClient, links);
  }
}
