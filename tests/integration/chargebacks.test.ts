import axios from 'axios';
import dotenv from 'dotenv';
import createMollieClient from '../..';

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = 'http';

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = createMollieClient({ apiKey: process.env.API_KEY });

describe('chargebacks', () => {
  it('should integrate', async () => {
    const chargebacks = await mollieClient.chargebacks.page();

    expect(chargebacks).toBeDefined();
  });
});
