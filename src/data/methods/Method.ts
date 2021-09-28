import { MethodData } from './data';
import Seal from '../../types/Seal';
import MethodHelper from './MethodHelper';
import TransformingNetworkClient from '../../TransformingNetworkClient';

type Method = Seal<MethodData, MethodHelper>;

export default Method;

export function transform(networkClient: TransformingNetworkClient, input: MethodData): Method {
  return Object.assign(new MethodHelper(networkClient, input._links), input);
}
