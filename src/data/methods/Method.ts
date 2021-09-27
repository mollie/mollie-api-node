import { MethodData } from './data';
import Seal from '../../types/Seal';
import methodHelpers from './helpers';

type Method = Seal<MethodData, typeof methodHelpers>;

export default Method;

export function transform(input: MethodData): Method {
  return Object.assign(Object.create(methodHelpers), input);
}
