import mollie, { MollieClient } from '..';
import MockAdapter from 'axios-mock-adapter';

export default function wireMockClient(versionStrings?: string | string[]): { adapter: MockAdapter; client: MollieClient } {
  const adapter = new MockAdapter(undefined);
  return {
    adapter,
    client: mollie({
      apiKey: 'mock-api-key',
      adapter: adapter.adapter(),
      versionStrings,
    }),
  };
}
