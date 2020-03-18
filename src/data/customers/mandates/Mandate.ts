import { MandateData } from './data';
import mandateHelpers from './helpers';
import Seal from '../../../types/Seal';

type Mandate = Seal<MandateData, typeof mandateHelpers>;

export default Mandate;

export function injectPrototypes(input: MandateData): Mandate {
  return Object.assign(Object.create(mandateHelpers), input);
}
