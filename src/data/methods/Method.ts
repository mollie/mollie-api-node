import TransformingNetworkClient from '../../TransformingNetworkClient';
import Seal from '../../types/Seal';
import { MethodData } from './data';
import MethodHelper from './MethodHelper';

type Method = Seal<MethodData, MethodHelper>;

export default Method;

export function transform(networkClient: TransformingNetworkClient, input: MethodData): Method {
  return Object.assign(new MethodHelper(networkClient, input._links), input);
}
