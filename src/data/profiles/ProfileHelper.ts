import { runIf } from 'ruply';
import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import HelpfulIterator from '../../plumbing/iteration/HelpfulIterator';
import emptyHelpfulIterator from '../../plumbing/iteration/emptyHelpfulIterator';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';
import { ThrottlingParameter } from '../../types/parameters';
import Helper from '../Helper';
import Chargeback, { ChargebackData } from '../chargebacks/Chargeback';
import Method from '../methods/Method';
import { MethodData } from '../methods/data';
import Payment from '../payments/Payment';
import { PaymentData } from '../payments/data';
import Refund from '../refunds/Refund';
import { RefundData } from '../refunds/data';
import Profile from './Profile';
import { ProfileData, ProfileStatus } from './data';
import breakUrl from '../../communication/breakUrl';

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
  public getChargebacks(parameters?: ThrottlingParameter): HelpfulIterator<Chargeback> {
    return (
      runIf(
        this.links.chargebacks,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.iterate<ChargebackData, Chargeback>(pathname, 'chargebacks', query, parameters?.valuesPerMinute),
      ) ?? emptyHelpfulIterator
    );
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
    return runIf(this.links.methods, ({ href }) => this.networkClient.list<MethodData, Method>(href, 'methods')) ?? Promise.resolve([]);
  }

  /**
   * Returns the payments that belong to this profile.
   *
   * @since 3.6.0
   */
  public getPayments(parameters?: ThrottlingParameter): HelpfulIterator<Payment> {
    return (
      runIf(
        this.links.payments,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.iterate<PaymentData, Payment>(pathname, 'payments', query, parameters?.valuesPerMinute),
      ) ?? emptyHelpfulIterator
    );
  }

  /**
   * Returns the refunds that belong to this profile.
   *
   * @since 3.6.0
   */
  public getRefunds(parameters?: ThrottlingParameter): HelpfulIterator<Refund> {
    return (
      runIf(
        this.links.refunds,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.iterate<RefundData, Refund>(pathname, 'refunds', query, parameters?.valuesPerMinute),
      ) ?? emptyHelpfulIterator
    );
  }
}
