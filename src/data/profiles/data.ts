import Nullable from '../../types/Nullable';
import { ApiMode, Links, Url } from '../global';
import Model from '../Model';

export interface ProfileData extends Model<'profile'> {
  /**
   * Indicates whether the profile is in test or production mode.
   *
   * Possible values:
   *
   * -   `live` The profile is verified.
   * -   `test` The profile has not been verified yet and can only be used to create test payments.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=mode#response
   */
  mode: ApiMode;
  /**
   * The profile's name, this will usually reflect the trade name or brand name of the profile's website or application.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=name#response
   */
  name: string;
  /**
   * The URL to the profile's website or application.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=website#response
   */
  website: string;
  /**
   * The email address associated with the profile's trade name or brand.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=email#response
   */
  email: string;
  /**
   * The phone number associated with the profile's trade name or brand.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=phone#response
   */
  phone: string;
  /**
   * The industry associated with the profile's trade name or brand.
   *
   * Possible values:
   *
   * -   `5192` Books, magazines and newspapers
   * -   `5262` Marketplaces, crowdfunding, donation platforms
   * -   `5399` General merchandise
   * -   `5499` Food and drinks
   * -   `5533` Automotive Products
   * -   `5641` Children Products
   * -   `5651` Clothing & Shoes
   * -   `5712` Home furnishing
   * -   `5732` Electronics, computers and software
   * -   `5734` Hosting/VPN services
   * -   `5735` Entertainment
   * -   `5815` Credits/vouchers/giftcards
   * -   `5921` Alcohol
   * -   `5944` Jewelry & Accessories
   * -   `5945` Hobby, Toy, and Game Shops
   * -   `5977` Health & Beauty products
   * -   `6012` Financial services
   * -   `6051` Crypto currency
   * -   `7299` Consultancy
   * -   `7922` Events, conferences, concerts, tickets
   * -   `7997` Gyms, membership fee based sports
   * -   `7999` Travel, rental and transportation
   * -   `8111` Lawyers and legal advice
   * -   `8299` Advising/coaching/training
   * -   `8398` Charity and donations
   * -   `8699` Political parties
   * -   `9399` Government services
   * -   `0` Other
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=categoryCode#response
   */
  categoryCode: number;
  /**
   * The profile status determines whether the profile is able to receive live payments.
   *
   * Possible values:
   *
   * -   `unverified` The profile has not been verified yet and can only be used to create test payments.
   * -   `verified` The profile has been verified and can be used to create live payments and test payments.
   * -   `blocked` The profile is blocked and can thus no longer be used or changed.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=status#response
   */
  status: ProfileStatus;
  /**
   * The presence of a review object indicates changes have been made that have not yet been approved by Mollie. Changes to test profiles are approved automatically, unless a switch to a live profile
   * has been requested. The review object will therefore usually be `null` in test mode.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=review#response
   */
  review: Nullable<{
    /**
     * The status of the requested profile changes.
     *
     * Possible values:
     *
     * -   `pending` The changes are pending review. We will review your changes soon.
     * -   `rejected` We have reviewed and rejected your changes.
     *
     * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=review/status#response
     */
    status: string;
  }>;
  /**
   * The profile's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=createdAt#response
   */
  createdAt: string;
  /**
   * An object with several URL objects relevant to the profile. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=_links#response
   */
  _links: ProfileLinks;
}

export interface ProfileLinks extends Links {
  /**
   * The API resource URL of the chargebacks that belong to this profile.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=_links/chargebacks#response
   */
  chargebacks: Url;
  /**
   * The API resource URL of the methods that are enabled for this profile.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=_links/methods#response
   */
  methods: Url;
  /**
   * The API resource URL of the payments that belong to this profile.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=_links/payments#response
   */
  payments: Url;
  /**
   * The API resource URL of the refunds that belong to this profile.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=_links/refunds#response
   */
  refunds: Url;
  /**
   * The Checkout preview URL. You need to be logged in to access this page.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=_links/checkoutPreviewUrl#response
   */
  checkoutPreviewUrl: Url;
}

export enum ProfileStatus {
  unverified = 'unverified',
  verified = 'verified',
  blocked = 'blocked',
}
