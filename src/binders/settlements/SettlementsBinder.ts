import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Page from '../../data/page/Page';
import { SettlementData } from '../../data/settlements/data';
import SettlementModel from '../../data/settlements/SettlementModel';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';
import Binder from '../Binder';
import { IterateParameters, ListParameters } from './parameters';

const pathSegment = 'settlements';

export default class SettlementsBinder extends Binder<SettlementData, SettlementModel> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Successful payments, together with refunds, captures and chargebacks are collected into *settlements*, which are then paid out according to your organization's payout schedule. By retrieving a
   * single settlement, you can check which payments were paid out with it, when the settlement took place, and what invoices were created to invoice the costs in the settlement.
   *
   * Beside payments, settlements can be composed of other entities such as refunds, chargebacks or captures.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement
   */
  public get(id: string): Promise<SettlementModel>;
  public get(id: string, callback: Callback<SettlementModel>): void;
  public get(id: string) {
    if (renege(this, this.get, ...arguments)) return;
    // Don't check the ID, as the ID can be the bank reference.
    return this.networkClient.get<SettlementData, SettlementModel>(`${pathSegment}/${id}`);
  }

  /**
   * Retrieve the details of the current settlement that has not yet been paid out.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-next-settlement
   */
  public getNext(): Promise<SettlementModel>;
  public getNext(callback: Callback<SettlementModel>): void;
  public getNext() {
    if (renege(this, this.getNext, ...arguments)) return;
    return this.networkClient.get<SettlementData, SettlementModel>(`${pathSegment}/next`);
  }

  /**
   * Retrieve the details of the open balance of the organization. This will return a settlement object representing your organization's balance.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-open-settlement
   */
  public getOpen(): Promise<SettlementModel>;
  public getOpen(callback: Callback<SettlementModel>): void;
  public getOpen() {
    if (renege(this, this.getOpen, ...arguments)) return;
    return this.networkClient.get<SettlementData, SettlementModel>(`${pathSegment}/open`);
  }

  /**
   * Retrieve all payments links created with the current website profile, ordered from newest to oldest.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/payment-links-api/list-payment-links
   */
  public page(parameters?: ListParameters): Promise<Page<SettlementModel>>;
  public page(parameters: ListParameters, callback: Callback<Page<SettlementModel>>): void;
  public page(parameters: ListParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<SettlementData, SettlementModel>(pathSegment, 'settlements', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve a single payment link object by its token.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<SettlementData, SettlementModel>(pathSegment, 'settlements', query, valuesPerMinute);
  }
}
