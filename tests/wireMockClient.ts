import createMollieClient, { MollieClient } from '..';
import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {} from 'jest-bluster';

export default function wireMockClient(versionStrings?: string | string[]): { adapter: MockAdapter; client: MollieClient } {
  const adapter = new MockAdapter((undefined as unknown) as AxiosInstance);
  return {
    adapter,
    client: createMollieClient({
      apiKey: 'mock-api-key',
      adapter: adapter.adapter(),
      versionStrings,
    }),
  };
}
