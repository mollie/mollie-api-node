import createMollieClient, { MollieClient, MollieOptions } from '..';
import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import 'jest-bluster';

export default function wireMockClient(options?: Omit<MollieOptions, 'accessToken' | 'adapter' | 'apiKey'>): { adapter: MockAdapter; client: MollieClient } {
  const adapter = new MockAdapter(undefined as unknown as AxiosInstance);
  return {
    adapter,
    client: createMollieClient({
      apiKey: 'mock-api-key',
      adapter: adapter.adapter(),
      ...options,
    }),
  };
}
