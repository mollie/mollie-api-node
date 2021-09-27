import renege from '../plumbing/renege';
import TransformingNetworkClient from '../TransformingNetworkClient';
import Callback from '../types/Callback';
import { Links } from './global';
import Model from './Model';

export default class Helper<R extends Model<any, any>, U> {
  constructor(protected readonly networkClient: TransformingNetworkClient, protected readonly links: Links) {}

  public refresh(): Promise<U>;
  public refresh(callback: Callback<U>): void;
  public refresh() {
    if (renege(this, this.refresh, ...arguments)) return;
    return this.networkClient.get<R, U>(this.links.self.href);
  }

  /**
   * Converts this object to a plain one.
   */
  public toPlainObject(this: Model<any>): any {
    // Previously, we used Lodash' toPlainObject here. However, back then we used classes for our models instead of
    // interfaces. This should have the same effect on the new object as _.toPlainObject had on the old ones: returning
    // a plain object with no prototype.
    return Object.assign({}, this);
  }
}
