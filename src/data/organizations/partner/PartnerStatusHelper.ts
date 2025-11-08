import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Helper from '../../Helper';
import type PartnerStatus from './PartnerStatus';
import type { PartnerStatusData } from './data';

export default class PartnerStatusHelper extends Helper<PartnerStatusData, PartnerStatus> {
  constructor(networkClient: TransformingNetworkClient, links: PartnerStatusData['_links']) {
    super(networkClient, links);
  }
}
