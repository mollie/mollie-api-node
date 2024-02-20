import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';
import createMollieClient from '../..';

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = httpAdapter;

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = createMollieClient({ apiKey: process.env.API_KEY });

describe('terminals', () => {
  it('should integrate', async () => {
    const terminals = await mollieClient.terminals.page();

    expect(terminals).toBeDefined();

    const terminal = await mollieClient.terminals.get(terminals[0].id);
    expect(terminal).toBeDefined();
  });
});
