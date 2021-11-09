import Model from '../data/Model';
import NetworkClient from './NetworkClient';
import fling from '../plumbing/fling';

export class Transformers {
  readonly add: <R extends string, T extends Model<R, any>>(resource: R, transformer: (networkClient: TransformingNetworkClient, input: T) => any) => Transformers;
  readonly get: (resource: string) => (networkClient: TransformingNetworkClient, input: any) => any;
  constructor() {
    const map = new Map<string, any>();
    this.add = (resource, transformer) => {
      map.set(resource, transformer);
      return this;
    };
    this.get = Map.prototype.get.bind(map);
  }
}

/**
 * This class wraps around a `NetworkClient`, and transforms plain objects returned by the Mollie API into more
 * convenient JavaScript objects.
 */
export default class TransformingNetworkClient {
  protected readonly transform: (input: Model<any, string | undefined>) => any;
  constructor(protected readonly networkClient: NetworkClient, transformers: Transformers) {
    /**
     * Transforms the passed plain object returned by the Mollie API into a more convenient JavaScript object.
     */
    this.transform = function transform(this: TransformingNetworkClient, input: Model<any, string | undefined>) {
      return (transformers.get(input.resource) ?? fling(() => new Error(`Received unexpected response from the server with resource ${input.resource}`)))(this, input);
    }.bind(this);
  }

  async post<R extends Model<any, any>, U extends any>(...passingArguments: Parameters<NetworkClient['post']>) {
    const response = await this.networkClient.post<R>(...passingArguments);
    if (response == true) {
      return true as U;
    }
    return this.transform(response) as U;
  }

  get<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['get']>) {
    return this.networkClient.get<R>(...passingArguments).then(this.transform) as Promise<U>;
  }

  async list<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['list']>) {
    const response = await this.networkClient.list<R>(...passingArguments);
    const { count, links } = response;
    return Object.assign(response.map(this.transform) as U[], { count, links });
  }

  listPlain<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['listPlain']>) {
    return this.networkClient.listPlain<R>(...passingArguments).then(response => response.map(this.transform) as U[]);
  }

  exhaust<R extends Model<any, any>, U>(...firstPageArguments: Parameters<NetworkClient['list']>): AsyncIterator<U, void, never> {
    const iterator = this.networkClient.exhaust<R>(...firstPageArguments);
    return {
      next: async () => {
        const { done, value } = await iterator.next();
        if (done) {
          return { done, value: undefined };
        }
        return { done: false, value: this.transform(value as R) };
      }
    };
  }

  patch<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['patch']>) {
    return this.networkClient.patch<R>(...passingArguments).then(this.transform) as Promise<U>;
  }

  async delete<R extends Model<any, any>, U extends any>(...passingArguments: Parameters<NetworkClient['delete']>) {
    const response = await this.networkClient.delete<R>(...passingArguments);
    if (response == true) {
      return true as U;
    }
    return this.transform(response) as U;
  }
}
