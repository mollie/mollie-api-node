import { runIf } from 'ruply';
import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import breakUrl from '../../communication/breakUrl';
import type HelpfulIterator from '../../plumbing/iteration/HelpfulIterator';
import emptyHelpfulIterator from '../../plumbing/iteration/emptyHelpfulIterator';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import type Nullable from '../../types/Nullable';
import { type ThrottlingParameter } from '../../types/parameters';
import Helper from '../Helper';
import type Chargeback from '../chargebacks/Chargeback';
import { type ChargebackData } from '../chargebacks/Chargeback';
import type Method from '../methods/Method';
import { type MethodData } from '../methods/data';
import type Payment from '../payments/Payment';
import { type PaymentData } from '../payments/data';
import type Refund from '../refunds/Refund';
import { type RefundData } from '../refunds/data';
import type Profile from './Profile';
import { type ProfileData } from './data';

export default class ProfileHelper extends Helper<ProfileData, Profile> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: ProfileData['_links'],
  ) {
    super(networkClient, links);
  }

  /**
   * The Checkout preview URL. You need to be logged in to access this page.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile?path=_links/checkoutPreviewUrl#response
   */
  public getCheckoutPreviewUrl(): Nullable<string> {
    return this.links.checkoutPreviewUrl?.href ?? null;
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
    return (
      runIf(
        this.links.methods,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.list<MethodData, Method>(pathname, 'methods', query),
      ) ?? Promise.resolve([])
    );
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
