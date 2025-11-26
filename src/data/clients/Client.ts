import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import type Capability from '../capabilities/Capability';
import type Onboarding from '../onboarding/Onboarding';
import { transform as transformOnboarding } from '../onboarding/Onboarding';
import type Organization from '../organizations/Organizations';
import { transform as transformOrganization } from '../organizations/Organizations';
import ClientHelper from './ClientHelper';
import { type ClientData } from './data';

type Client = Seal<
  Omit<ClientData, '_links' | '_embedded'> & {
    _embedded?: {
      organization?: Organization;
      onboarding?: Onboarding;
      capabilities?: Capability[];
    };
  },
  ClientHelper
>;

export default Client;

export function transform(networkClient: TransformingNetworkClient, input: ClientData): Client {
  let _embedded: Client['_embedded'];
  if (input._embedded != undefined) {
    _embedded = {};
    if (input._embedded.organization != undefined) {
      _embedded.organization = transformOrganization(networkClient, input._embedded.organization);
    }
    if (input._embedded.onboarding != undefined) {
      _embedded.onboarding = transformOnboarding(networkClient, input._embedded.onboarding);
    }
    if (input._embedded.capabilities != undefined) {
      // Capabilities don't need transformation (no helper methods)
      _embedded.capabilities = input._embedded.capabilities;
    }
  }
  return Object.assign(Object.create(new ClientHelper(networkClient, input._links, _embedded)), input, { _embedded });
}
