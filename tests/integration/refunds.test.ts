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

describe('refunds', () => {
  it('should integrate', async () => {
    const refunds = await mollieClient.refunds.page();

    expect(refunds).toBeDefined();
  });
});
