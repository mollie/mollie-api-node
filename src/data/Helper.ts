import { inspect, type InspectOptionsStylized } from 'util';
import breakUrl from '../communication/breakUrl';
import type TransformingNetworkClient from '../communication/TransformingNetworkClient';
import buildFromEntries from '../plumbing/buildFromEntries';
import capitalize from '../plumbing/capitalize';
import renege from '../plumbing/renege';
import type Callback from '../types/Callback';
import type Maybe from '../types/Maybe';
import { type Links } from './global';
import type Model from './Model';

const stringRepresentationBlacklist = new Set(['resource', 'id', '_links', '_embedded']);

/**
 * Returns a human-readable representation of the passed subject.
 */
function convertToString(subject: Model<string>, tag: string, depth: number, options: InspectOptionsStylized) {
  const parts = [tag];
  if (subject.id != undefined) {
    parts.push(subject.id);
  }
  if (depth < 0) {
    return options.stylize(`[${parts.join(' ')}]`, 'special');
  }
  parts.push(inspect(buildFromEntries(Object.entries(subject).filter(([key]) => stringRepresentationBlacklist.has(key) === false)), { ...options, depth: 1, sorted: true }));
  return parts.join(' ');
}

export default class Helper<R extends Model<string, Maybe<string>>, U> {
  constructor(
    protected readonly networkClient: TransformingNetworkClient,
    protected readonly links: Links,
  ) {}

  public refresh(): Promise<U>;
  public refresh(callback: Callback<U>): void;
  public refresh() {
    if (renege(this, this.refresh, ...arguments)) return;
    return this.networkClient.get<R, U>(...breakUrl(this.links.self.href));
  }

  public get [Symbol.toStringTag]() {
    return capitalize((this as unknown as Model<string>).resource);
  }

  public [inspect.custom](this: Helper<Model<string>, any> & Model<string>, depth: number, options: InspectOptionsStylized) {
    return convertToString(this, this[Symbol.toStringTag], depth, options);
  }
}
