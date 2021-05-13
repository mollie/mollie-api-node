import { AxiosRequestConfig } from 'axios';
import Xor from './types/Xor';

type Options = Xor<
  {
    /**
     * The Mollie API key, starting with `'test_'` or `'live_'`.
     */
    apiKey: string;
  },
  {
    /**
     * OAuth access token, starting with `'access_''.
     */
    accessToken: string;
  }
> & {
  /**
   * One or an array of version strings of the software you are using, such as `'RockenbergCommerce/3.1.12'`.
   */
  versionStrings?: string | string[];
  /**
   * The headers set in the requests sent to the Mollie API. `Authorization`, `User-Agent`, `Accept`,
   * `Accept-Encoding`, and `Content-Type` are set by this library directly. Setting them here has no effect.
   */
  headers?: Record<string, string>;
  /**
   * The URL of the root of the Mollie API. Default: `'https://api.mollie.com:443/v2/'`.
   */
  apiEndpoint?: string;
} & Pick<AxiosRequestConfig, 'adapter' | 'proxy' | 'socketPath' | 'timeout'>;

export default Options;
