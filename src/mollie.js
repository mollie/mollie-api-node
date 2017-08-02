import fs from 'fs';
import path from 'path';
import https from 'https';
import assign from 'lodash/assign';
import axios from 'axios';

import createHttpClient from './create-http-client';
import createMollieApi from './create-mollie-api';
import cert from './cacert.pem';

import { version } from '../package.json';

/**
 * Create Mollie client.
 * @param options
 * @returns {Object} available resources
 * @since 2.0.0
 */
export default function mollie(options = {}) {
  if (!options.apiKey) {
    throw new TypeError('Missing parameter "apiKey".');
  }

  options.defaultHostname = 'api.mollie.com';
  options.headers = assign(options.headers, {
    Authorization: `Bearer ${options.apiKey}`,
    'Content-Type': 'application/vnd.mollie.api.v1+json',
    'X-Mollie-User-Agent': `mollie/${version}`,
  });
  options.httpsAgent = new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, cert)),
  });

  const httpClient = createHttpClient(axios, options);

  return createMollieApi({ httpClient });
}
