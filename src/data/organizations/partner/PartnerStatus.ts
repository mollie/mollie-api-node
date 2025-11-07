import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Seal from '../../../types/Seal';
import Helper from '../../Helper';
import type { PartnerStatusData } from './data';

type PartnerStatus = Seal<PartnerStatusData, Helper<PartnerStatusData, PartnerStatus>>;

export default PartnerStatus;

export function transform(networkClient: TransformingNetworkClient, input: PartnerStatusData): PartnerStatus {
  return Object.assign(Object.create(new Helper<PartnerStatusData, PartnerStatus>(networkClient, input._links)), input);
}
