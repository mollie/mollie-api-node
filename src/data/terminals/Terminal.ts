import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import Helper from '../Helper';
import type { TerminalData } from './data';

type Terminal = Seal<TerminalData, Helper<TerminalData, Terminal>>;

export default Terminal;

export function transform(networkClient: TransformingNetworkClient, input: TerminalData): Terminal {
  return Object.assign(Object.create(new Helper(networkClient, input._links)), input);
}
