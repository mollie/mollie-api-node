import NetworkClient from './NetworkClient';

/**
 * This class wraps around a `NetworkClient`, and transforms objects returned by the Mollie server.
 */
export default class TransformingNetworkClient<R, T> {
  constructor(protected readonly networkClient: NetworkClient, protected readonly transform: (input: R) => T) {}
  async post<U extends T | true = T | true>(...passingArguments: Parameters<NetworkClient['post']>): Promise<U> {
    const response = await this.networkClient.post<R>(...passingArguments);
    if (response == true) {
      return true as U;
    }
    return this.transform(response) as U;
  }
  get(...passingArguments: Parameters<NetworkClient['get']>) {
    return this.networkClient.get<R>(...passingArguments).then(this.transform);
  }
  async list(...passingArguments: Parameters<NetworkClient['list']>) {
    const response = await this.networkClient.list<R>(...passingArguments);
    const { count, links } = response;
    return Object.assign(response.map(this.transform), { count, links });
  }
  patch(...passingArguments: Parameters<NetworkClient['patch']>) {
    return this.networkClient.patch<R>(...passingArguments).then(this.transform);
  }
  async delete<U extends T | true = T | true>(...passingArguments: Parameters<NetworkClient['delete']>): Promise<U> {
    const response = await this.networkClient.delete<R>(...passingArguments);
    if (response == true) {
      return true as U;
    }
    return this.transform(response) as U;
  }
}
