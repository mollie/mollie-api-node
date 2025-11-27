import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Seal from '../../../types/Seal';
import type { PartnerStatusData } from './data';
import PartnerStatusHelper from './PartnerStatusHelper';

type PartnerStatus = Seal<Omit<PartnerStatusData, '_links'>, PartnerStatusHelper>;

export default PartnerStatus;

export function transform(networkClient: TransformingNetworkClient, input: PartnerStatusData): PartnerStatus {
  return Object.assign(Object.create(new PartnerStatusHelper(networkClient, input._links)), input);
}
