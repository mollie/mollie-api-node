import renege from '../../plumbing/renege';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import Callback from '../../types/Callback';
import Chargeback, { ChargebackData } from '../chargebacks/Chargeback';
import Helper from '../Helper';
import { MethodData } from '../methods/data';
import Method from '../methods/Method';
import { PaymentData } from '../payments/data';
import Payment from '../payments/Payment';
import { RefundData } from '../refunds/data';
import Refund from '../refunds/Refund';
import { ProfileData, ProfileStatus } from './data';
import Profile from './Profile';

export default class ProfileHelper extends Helper<ProfileData, Profile> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: ProfileData['_links']) {
    super(networkClient, links);
  }

  /**
   * @deprecated Use `profile.status == ProfileStatus.unverified` instead.
   */
  public isUnverified(this: ProfileData) {
    return this.status == ProfileStatus.unverified;
  }

  /**
   * @deprecated Use `profile.status == ProfileStatus.verified` instead.
   */
  public isVerified(this: ProfileData) {
    return this.status == ProfileStatus.verified;
  }

  /**
   * @deprecated Use `profile.status == ProfileStatus.blocked` instead.
   */
  public isBlocked(this: ProfileData) {
    return this.status == ProfileStatus.blocked;
  }

  /**
   * The Checkout preview URL. You need to be logged in to access this page.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=_links/checkoutPreviewUrl#response
   */
  public getCheckoutPreviewUrl() {
    if (this.links.checkoutPreviewUrl == undefined) {
      return null;
    }
    return this.links.checkoutPreviewUrl.href;
  }

  /**
   * Returns the chargebacks that belong to this profile.
   *
   * @since 3.6.0
   */
  public getChargebacks(): Promise<Array<Chargeback>>;
  public getChargebacks(callback: Callback<Array<Chargeback>>): void;
  public getChargebacks() {
    if (renege(this, this.getChargebacks, ...arguments)) return;
    if (this.links.chargebacks == undefined) {
      return Promise.resolve([]);
    }
    return this.networkClient.listPlain<ChargebackData, Chargeback>(this.links.chargebacks.href, 'chargebacks');
  }

  /**
   * Returns the methods that are enabled for this profile.
   *
   * @since 3.6.0
   */
  public getMethods(): Promise<Array<Method>>;
  public getMethods(callback: Callback<Array<Method>>): void;
  public getMethods() {
    if (renege(this, this.getMethods, ...arguments)) return;
    if (this.links.methods == undefined) {
      return Promise.resolve([]);
    }
    return this.networkClient.listPlain<MethodData, Method>(this.links.methods.href, 'methods');
  }

  /**
   * Returns the payments that belong to this profile.
   *
   * @since 3.6.0
   */
  public getPayments(): Promise<Array<Payment>>;
  public getPayments(callback: Callback<Array<Payment>>): void;
  public getPayments() {
    if (renege(this, this.getPayments, ...arguments)) return;
    if (this.links.payments == undefined) {
      return Promise.resolve([]);
    }
    return this.networkClient.listPlain<PaymentData, Payment>(this.links.payments.href, 'payments');
  }

  /**
   * Returns the refunds that belong to this profile.
   *
   * @since 3.6.0
   */
  public getRefunds(): Promise<Array<Refund>>;
  public getRefunds(callback: Callback<Array<Refund>>): void;
  public getRefunds() {
    if (renege(this, this.getRefunds, ...arguments)) return;
    if (this.links.refunds == undefined) {
      return Promise.resolve([]);
    }
    return this.networkClient.listPlain<RefundData, Refund>(this.links.refunds.href, 'refunds');
  }
}
