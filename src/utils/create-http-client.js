import qs from 'qs';
import assign from 'lodash/assign';

/**
 * Create pre-configured httpClient instance
 * @private
 */
export default function createHttpClient(httpClient, httpClientParams) {
  const {
    insecure,
    host,
    defaultHostname,
    httpAgent,
    httpsAgent,
    proxy,
  } = httpClientParams;
  // prettier-ignore
  const [
    hostname = defaultHostname,
    port = insecure ? 80 : 443,
  ] = (host && host.split(':')) || [];
  const baseURL = `${insecure ? 'http' : 'https'}://${hostname}:${port}/v1/`;
  const headers = assign(httpClientParams.headers, {
    'user-agent': `node.js/${process.version}`,
    'Accept-Encoding': 'gzip',
  });

  return httpClient.create({
    baseURL,
    headers,
    httpAgent,
    httpsAgent,
    proxy,
    paramsSerializer: qs.stringify,
  });
}
