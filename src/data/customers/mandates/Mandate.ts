import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Seal from '../../../types/Seal';
import { type MandateData } from './data';
import MandateHelper from './MandateHelper';

type Mandate = Seal<MandateData, MandateHelper>;

export default Mandate;

export function transform(networkClient: TransformingNetworkClient, input: MandateData): Mandate {
  return Object.assign(Object.create(new MandateHelper(networkClient, input._links)), input);
}
