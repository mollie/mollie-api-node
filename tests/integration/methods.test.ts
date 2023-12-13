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

describe('methods', () => {
  it('should integrate', async () => {
    const methods = await mollieClient.methods.list();

    expect(methods).toBeDefined();

    const method = await mollieClient.methods.get(methods[0].id);
    expect(method).toBeDefined();
  });
});
