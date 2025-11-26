import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import ClientLinkHelper from './ClientLinkHelper';
import { type ClientLinkData } from './data';

type ClientLink = Seal<Omit<ClientLinkData, '_links'>, ClientLinkHelper>;

export default ClientLink;

export function transform(networkClient: TransformingNetworkClient, input: ClientLinkData): ClientLink {
  return Object.assign(Object.create(new ClientLinkHelper(networkClient, input._links)), input);
}
