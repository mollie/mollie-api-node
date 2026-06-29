import dotenv from 'dotenv';
import createMollieClient from '../..';

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = createMollieClient({ apiKey: process.env.API_KEY });

describe('terminalPairingCodes', () => {
  // TODO: This test is skipped for now because the pairing-codes endpoints do not support test mode yet, so it
  // requires a dedicated live API key and an actual profile to pair against. Mirrors the skipped terminals test.
  it.skip('should integrate', async () => {
    const pairingCode = await mollieClient.terminalPairingCodes.create({ profileId: 'pfl_xxxxxxxxxx' });
    expect(pairingCode).toBeDefined();
    expect(pairingCode.code).toBeDefined();

    const pairingCodes = await mollieClient.terminalPairingCodes.page();
    expect(pairingCodes).toBeDefined();

    const fetched = await mollieClient.terminalPairingCodes.get(pairingCode.id);
    expect(fetched.id).toBe(pairingCode.id);

    const revoked = await mollieClient.terminalPairingCodes.revoke(pairingCode.id);
    expect(revoked.status).toBe('revoked');
  });
});
