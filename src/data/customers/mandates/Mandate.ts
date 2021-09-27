import { MandateData } from './data';
import Seal from '../../../types/Seal';
import MandateHelper from './MandateHelper';
import TransformingNetworkClient from '../../../TransformingNetworkClient';

type Mandate = Seal<MandateData, MandateHelper>;

export default Mandate;

export function transform(networkClient: TransformingNetworkClient, input: MandateData): Mandate {
  return Object.assign(new MandateHelper(networkClient, input._links), input);
}
