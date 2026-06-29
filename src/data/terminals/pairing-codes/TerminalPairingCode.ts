import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Seal from '../../../types/Seal';
import { type TerminalPairingCodeData } from './data';
import TerminalPairingCodeHelper from './TerminalPairingCodeHelper';

type TerminalPairingCode = Seal<TerminalPairingCodeData, TerminalPairingCodeHelper>;

export default TerminalPairingCode;

export function transform(networkClient: TransformingNetworkClient, input: TerminalPairingCodeData): TerminalPairingCode {
  return Object.assign(Object.create(new TerminalPairingCodeHelper(networkClient, input._links)), input);
}
