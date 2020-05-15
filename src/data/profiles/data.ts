import { ApiMode, Links, Url } from '../global';
import Model from '../Model';
import Nullable from '../../types/Nullable';

/**
 * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile
 */
export interface ProfileData extends Model<'profile', string> {
  mode: ApiMode;
  /**
   * The profile's name, this will usually reflect the tradename or brand name of the profile's website or application.
   */
  name: string;
  /**
   * The URL to the profile’s website or application.
   */
  website: string;
  /**
   * The email address associated with the profile's trade name or brand.
   */
  email: string;
  /**
   * The phone number associated with the profile's trade name or brand.
   */
  phone: string;
  /**
   * The industry associated with the profile’s trade name or brand. Possible values:
   *
   *  * `5192`: Books, magazines and newspapers
   *  * `5399`: General merchandise
   *  * `5499`: Food and drinks
   *  * `5533`: Automotive Products
   *  * `5641`: Children Products
   *  * `5651`: Clothing & Shoes
   *  * `5732`: Electronics, computers and software
   *  * `5734`: Hosting/VPN services
   *  * `5735`: Entertainment
   *  * `5815`: Credits/vouchers/giftcards
   *  * `5921`: Alcohol
   *  * `5944`: Jewelry & Accessories
   *  * `5977`: Health & Beauty products
   *  * `6012`: Financial services
   *  * `7299`: Consultancy
   *  * `7999`: Travel, rental and transportation
   *  * `8299`: Advising/coaching/training
   *  * `8398`: Charity and donations
   *  * `8699`: Political parties
   *  * `0`: Other
   */
  categoryCode: number;
  /**
   * The profile status determines whether the profile is able to receive live payments. Possible values:
   *
   *  * `'unverified'`: The profile has not been verified yet and can only be used to create test payments.
   *  * `'verified'`: The profile has been verified and can be used to create live payments and test payments.
   *  * `'blocked'`: The profile is blocked and can thus no longer be used or changed.
   */
  status: 'unverified' | 'verified' | 'blocked';
  /**
   * The presence of a review object indicates changes have been made that have not yet been approved by Mollie.
   * Changes to test profiles are approved automatically, unless a switch to a live profile has been requested. The
   * review object will therefore usually be `null` in test mode.
   */
  review: Nullable<{
    /**
     * The status of the requested profile changes. Possible values:
     *
     *  * `'pending'`: The changes are pending review. We will review your changes soon.
     *  * `'rejected'`: We’ve reviewed and rejected your changes.
     */
    status: string;
  }>;
  /**
   * The profile's date and time of creation, in ISO 8601 format.
   */
  createdAt: string;
  _links: PermissionLinks;
}

export interface PermissionLinks extends Links {
  /**
   * The API resource URL of the chargebacks that belong to this profile.
   */
  chargebacks: Url;
  /**
   * The API resource URL of the methods that are enabled for this profile.
   */
  methods: Url;
  /**
   * The API resource URL of the payments that belong to this profile.
   */
  payments: Url;
  /**
   * The API resource URL of the refunds that belong to this profile.
   */
  refunds: Url;
  /**
   * The Checkout preview URL. You need to be logged in to access this page.
   */
  checkoutPreviewUrl: Url;
}
