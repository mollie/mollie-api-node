import { ListLinks } from './data/list/List';
import Model from './data/Model';
import NetworkClient from './NetworkClient';

export class Transformers {
  readonly add: <R extends string, T extends Model<R, any>>(resource: R, transformer: (input: T) => any) => Transformers;
  readonly get: (resource: string) => (input: any) => any;
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
 * This class wraps around a `NetworkClient`, and transforms plain objects returned by the Mollie server into more
 * convenient JavaScript objects.
 */
export default class TransformingNetworkClient {
  readonly post: <R extends Model<any, any> | true, U>(...passingArguments: Parameters<NetworkClient['post']>) => Promise<U>;
  readonly get: <R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['get']>) => Promise<U>;
  readonly list: <R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['list']>) => Promise<U[] & { count: number; links: ListLinks }>;
  readonly patch: <R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['patch']>) => Promise<U>;
  readonly delete: <R extends Model<any, any> | true, U>(...passingArguments: Parameters<NetworkClient['delete']>) => Promise<U>;
  constructor(networkClient: NetworkClient, transformers: Transformers) {
    /**
     * Transforms the passed plain object returned by the Molile server into a more convenient JavaScript object.
     */
    function transform(input: Model<any, string | undefined>) {
      const transformer = transformers.get(input.resource);
      if (transformer == undefined) {
        throw new Error(`Received unexpected response from the server with resource ${input.resource}`);
      }
      return transformer(input);
    }
    this.post = async function post<R extends Model<any, any>, U extends any>(...passingArguments: Parameters<NetworkClient['get']>) {
      const response = await networkClient.post<R>(...passingArguments);
      if (response == true) {
        return true as U;
      }
      return transform(response) as U;
    };
    this.get = function get<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['get']>) {
      return networkClient.get<R>(...passingArguments).then(transform) as Promise<U>;
    };
    this.list = async function list<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['list']>) {
      const response = await networkClient.list<R>(...passingArguments);
      const { count, links } = response;
      return Object.assign(response.map(transform) as U[], { count, links });
    };
    this.patch = function patch<R extends Model<any, any>, U>(...passingArguments: Parameters<NetworkClient['patch']>) {
      return networkClient.patch<R>(...passingArguments).then(transform) as Promise<U>;
    };
    this['delete'] = async function <R extends Model<any, any>, U extends any>(...passingArguments: Parameters<NetworkClient['delete']>) {
      const response = await networkClient.delete<R>(...passingArguments);
      if (response == true) {
        return true as U;
      }
      return transform(response) as U;
    };
  }
}
