import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type TerminalData } from './data';
import TerminalHelper from './TerminalHelper';

type Terminal = Seal<Omit<TerminalData, '_links'>, TerminalHelper>;

export default Terminal;

export function transform(networkClient: TransformingNetworkClient, input: TerminalData): Terminal {
  return Object.assign(Object.create(new TerminalHelper(networkClient, input._links)), input);
}
