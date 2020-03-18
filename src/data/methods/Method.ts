import { MethodData } from './data';
import methodHelpers from './helpers';
import Seal from '../../types/Seal';

type Method = Seal<MethodData, typeof methodHelpers>;

export default Method;

export function injectPrototypes(input: MethodData): Method {
  return Object.assign(Object.create(methodHelpers), input);
}
