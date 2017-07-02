import fs from 'fs';
import path from 'path';
import https from 'https';
import assign from 'lodash/assign';

import createHttpClient from './utils/create-http-client';
import createMollieApi from './create-mollie-api';
import cert from './cacert.pem';

import { version } from '../package.json';

/**
 * Create Mollie client.
 * @param httpVendor
 * @param options
 * @returns {Object} available resources
 * @since 2.0.0
 */
export default function mollie(httpVendor, options = {}) {
  if (!options.apiKey) {
    throw new TypeError('Missing parameter "apiKey".');
  }

  options.defaultHostname = 'api.mollie.com';
  options.headers = assign(options.headers, {
    Authorization: `Bearer ${options.apiKey}`,
    'Content-Type': 'application/vnd.mollie.api.v1+json',
    'X-Mollie-User-Agent': `mollie.js/${version}`,
  });
  options.httpsAgent = new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, cert)),
  });

  const httpClient = createHttpClient(httpVendor, options);

  return createMollieApi({ httpClient });
}
