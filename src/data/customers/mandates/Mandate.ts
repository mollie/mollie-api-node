import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Seal from '../../../types/Seal';
import { MandateData } from './data';
import MandateHelper from './MandateHelper';

type Mandate = Seal<MandateData, MandateHelper>;

export default Mandate;

export function transform(networkClient: TransformingNetworkClient, input: MandateData): Mandate {
  return Object.assign(Object.create(new MandateHelper(networkClient, input._links)), input);
}
