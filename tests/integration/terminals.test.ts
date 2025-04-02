import dotenv from 'dotenv';
import createMollieClient from '../..';

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = createMollieClient({ apiKey: process.env.API_KEY });

describe('terminals', () => {
  // TODO: This test is skipped for now because it requires adding a terminal to the test account and thus potentially a dedicated API key.
  // https://github.com/mollie/mollie-api-node/pull/413?notification_referrer_id=NT_kwDOAC7wUbMxNTM1MTQzMjMwMDozMDc2MTc3#issuecomment-2765899992
  it.skip('should integrate', async () => {
    const terminals = await mollieClient.terminals.page();

    expect(terminals).toBeDefined();

    const terminal = await mollieClient.terminals.get(terminals[0].id);
    expect(terminal).toBeDefined();
  });
});
