import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type SettlementData } from './data';
import SettlementHelper from './SettlementHelper';

type SettlementModel = Seal<Omit<SettlementData, '_links'>, SettlementHelper>;

export default SettlementModel;

export function transform(networkClient: TransformingNetworkClient, input: SettlementData): SettlementModel {
  return Object.assign(Object.create(new SettlementHelper(networkClient, input._links)), input);
}
