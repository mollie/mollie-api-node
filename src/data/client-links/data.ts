import { type Links, type Url } from '../global';
import type Model from '../Model';

/**
 * Client link data representing a link to connect a new or existing organization to an OAuth application.
 *
 * @see https://docs.mollie.com/reference/create-client-link
 */
export interface ClientLinkData extends Model<'client-link'> {
  /**
   * An object with several relevant URLs.
   *
   * @see https://docs.mollie.com/reference/create-client-link?path=_links#response
   */
  _links: ClientLinkLinks;
}

export interface ClientLinkLinks extends Links {
  /**
   * The link you can send your customer to, where they can either log in and link their account,
   * or sign up and proceed with onboarding.
   *
   * Note: Before redirecting the customer, you need to append query parameters (client_id, state, scope)
   * to this URL.
   *
   * @see https://docs.mollie.com/reference/create-client-link?path=_links/clientLink#response
   */
  clientLink: Url;
}
