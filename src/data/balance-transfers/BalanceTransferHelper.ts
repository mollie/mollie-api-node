import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Helper from '../Helper';
import type BalanceTransfer from './BalanceTransfer';
import { type BalanceTransferData } from './data';

export default class BalanceTransferHelper extends Helper<BalanceTransferData, BalanceTransfer> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: BalanceTransferData['_links'],
  ) {
    super(networkClient, links);
  }
}
