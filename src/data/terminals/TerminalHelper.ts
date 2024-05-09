import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Helper from '../Helper';
import type Terminal from './Terminal';
import { type TerminalData } from './data';

export default class TerminalHelper extends Helper<TerminalData, Terminal> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: TerminalData['_links']) {
    super(networkClient, links);
  }

  // TODO: Wait for the _links.profile to be implemented in the API.
}
