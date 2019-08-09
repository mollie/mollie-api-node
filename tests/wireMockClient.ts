import mollie from '..';
import MockAdapter from 'axios-mock-adapter';
import { IMollieApiClient } from '../dist/types/src/create-mollie-api';

export default function wireMockClient(): { adapter: MockAdapter; client: IMollieApiClient } {
  const adapter = new MockAdapter(undefined);
  return {
    adapter,
    client: mollie({
      apiKey: 'mock-api-key',
      adapter: adapter.adapter(),
    }),
  };
}
