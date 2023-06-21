import type Model from '../data/Model';
import fling from '../plumbing/fling';
import type Maybe from '../types/Maybe';
import type NetworkClient from './NetworkClient';

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
  protected readonly transform: (input: Model<any, Maybe<string>>) => any;
  constructor(protected readonly networkClient: NetworkClient, transformers: Transformers) {
    /**
     * Transforms the passed plain object returned by the Mollie API into a more convenient JavaScript object.
     */
    this.transform = function transform(this: TransformingNetworkClient, input: Model<any, Maybe<string>>) {
      return (transformers.get(input.resource) ?? fling(() => new Error(`Received unexpected response from the server with resource ${input.resource}`)))(this, input);
    }.bind(this);
  }

  async post<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['post']>) {
    const response = await this.networkClient.post<R>(...passingArguments);
    if (response == true) {
      // (If the response is true, it is assumed that the U type variable is true.)
      return true as unknown as U;
    }
    return this.transform(response) as U;
  }

  get<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['get']>) {
    return this.networkClient.get<R>(...passingArguments).then(this.transform) as Promise<U>;
  }

  list<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['list']>) {
    return this.networkClient.list<R>(...passingArguments).then(response => response.map(this.transform) as U[]);
  }

  async page<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['page']>) {
    const response = await this.networkClient.page<R>(...passingArguments);
    const { count, links } = response;
    return Object.assign(response.map(this.transform) as U[], { count, links });
  }

  iterate<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['iterate']>) {
    return this.networkClient.iterate<R>(...passingArguments).map<U>(this.transform);
  }

  patch<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['patch']>) {
    return this.networkClient.patch<R>(...passingArguments).then(this.transform) as Promise<U>;
  }

  async delete<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['delete']>) {
    const response = await this.networkClient.delete<R>(...passingArguments);
    if (response == true) {
      // (If the response is true, it is assumed that the U type variable is true.)
      return true as unknown as U;
    }
    return this.transform(response) as U;
  }
}
