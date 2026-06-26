import type MaybeArray from './types/MaybeArray';
import type Xor from './types/Xor';

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
  versionStrings?: MaybeArray<string>;
  /**
   * The headers set in the requests sent to the Mollie API. `Authorization`, `User-Agent`, `Accept`,
   * `Accept-Encoding`, and `Content-Type` are set by this library directly. Setting them here has no effect.
   */
  headers?: Record<string, string>;
  /**
   * The URL of the root of the Mollie API. Default: `'https://api.mollie.com:443/v2/'`.
   */
  apiEndpoint?: string;
  /**
   * By default, this client refuses to run in a browser-like environment, as doing so would ship your API key to the
   * public and allow anyone to act on your behalf. Set this to `true` only if you understand the risks and have
   * appropriate mitigations in place (e.g. a short-lived, narrowly-scoped token).
   * @see https://github.com/mollie/mollie-api-node/#a-note-on-use-outside-of-nodejs
   */
  dangerouslyAllowBrowser?: boolean;
};

const falsyDescriptions = new Map<any, string>([
  [undefined, 'undefined'],
  [null, 'null'],
  ['', 'an empty string'],
]);

/**
 * Returns an error message (string) similar to `"Parameter "×" is null."` if a property with the passed key exists in
 * the passed options object, or `null` if said property does not exist.
 */
function describeFalsyOption(options: Options, key: keyof Options) {
  if (key in options == false) {
    return null;
  }
  return `Parameter "${key}" is ${falsyDescriptions.get(options[key]) ?? options[key]}.`;
}

/**
 * Throws a `TypeError` if the passed options object does not contain an `apiKey` or an `accessToken`.
 */
export function checkCredentials(options: Options) {
  if (!options.apiKey && !options.accessToken) {
    throw new TypeError(describeFalsyOption(options, 'apiKey') ?? describeFalsyOption(options, 'accessToken') ?? 'Missing parameter "apiKey" or "accessToken".');
  }
}

export default Options;
