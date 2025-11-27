import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import BalanceTransferHelper from './BalanceTransferHelper';
import { type BalanceTransferData } from './data';

type BalanceTransfer = Seal<Omit<BalanceTransferData, '_links'>, BalanceTransferHelper>;

export default BalanceTransfer;

export function transform(networkClient: TransformingNetworkClient, input: BalanceTransferData): BalanceTransfer {
  return Object.assign(Object.create(new BalanceTransferHelper(networkClient, input._links)), input);
}
