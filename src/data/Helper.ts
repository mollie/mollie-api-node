import { inspect, InspectOptionsStylized } from 'util';
import TransformingNetworkClient from '../communication/TransformingNetworkClient';
import capitalize from '../plumbing/capitalize';
import renege from '../plumbing/renege';
import Callback from '../types/Callback';
import { Links } from './global';
import Model from './Model';

const stringRepresentationBlacklist = new Set(['resource', 'id', '_links', '_embedded']);

/**
 * Returns a human-readable representation of the passed subject.
 */
function convertToString(subject: Model<string>, tag: string, depth: number, options: InspectOptionsStylized) {
  const parts = [tag];
  if (subject.id !== undefined) {
    parts.push(subject.id);
  }
  if (depth < 0) {
    return options.stylize(`[${parts.join(' ')}]`, 'special');
  }
  parts.push(inspect(Object.fromEntries(Object.entries(subject).filter(([key]) => stringRepresentationBlacklist.has(key) === false)), { ...options, depth: 1, sorted: true }));
  return parts.join(' ');
}

export default class Helper<R extends Model<string, string | undefined>, U> {
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
  public toPlainObject(this: Model<string>): any {
    // Previously, we used Lodash' toPlainObject here. However, back then we used classes for our models instead of
    // interfaces. This should have the same effect on the new object as _.toPlainObject had on the old ones: returning
    // a plain object with no prototype.
    return Object.assign({}, this);
  }

  public get [Symbol.toStringTag]() {
    return capitalize((this as unknown as Model<string>).resource);
  }

  public [inspect.custom](this: Helper<Model<string>, any> & Model<string>, depth: number, options: InspectOptionsStylized) {
    return convertToString(this, this[Symbol.toStringTag], depth, options);
  }
}
