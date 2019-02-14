import path from 'path';
import fs from 'fs';
import https from 'https';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { cloneDeep } from 'lodash';

import { version } from '../package.json';

export interface IMollieRequestConfig extends AxiosRequestConfig {
  apiKey: string;
}

/**
 * Create pre-configured httpClient instance
 *
 * @private
 */
export default function createHttpClient(options: IMollieRequestConfig): AxiosInstance {
  const newOptions = cloneDeep(options);
  newOptions.baseURL = 'https://api.mollie.com:443/v2/';

  newOptions.headers = {
    ...options.headers,
    Authorization: `Bearer ${options.apiKey}`,
    'Accept-Encoding': 'gzip',
    'Content-Type': 'application/json',
    'User-Agent': `node.js/${process.version}`,
    'X-Mollie-User-Agent': `mollie/${version}`,
  };

  newOptions.httpsAgent = new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, './cacert.pem'), 'utf8'),
  });

  return axios.create(newOptions);
}
