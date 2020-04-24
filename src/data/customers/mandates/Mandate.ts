import { MandateData } from './data';
import Seal from '../../../types/Seal';
import mandateHelpers from './helpers';

type Mandate = Seal<MandateData, typeof mandateHelpers>;

export default Mandate;

export function injectPrototypes(input: MandateData): Mandate {
  return Object.assign(Object.create(mandateHelpers), input);
}
