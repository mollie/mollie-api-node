import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type MethodData } from './data';
import MethodHelper from './MethodHelper';

type Method = Seal<MethodData, MethodHelper>;

export default Method;

export function transform(networkClient: TransformingNetworkClient, input: MethodData): Method {
  return Object.assign(Object.create(new MethodHelper(networkClient, input._links)), input);
}
