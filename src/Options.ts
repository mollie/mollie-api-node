import type MaybeArray from './types/MaybeArray';
import type Xor from './types/Xor';

/**
 * Default values applied to outgoing requests as a fallback. Each field is merged into a request only when the
 * endpoint accepts it and the per-call parameters do not already specify the value ‒ per-call values always take
 * precedence.
 *
 * These parameters are only meaningful for organization-level credentials (OAuth access tokens), which is why they
 * can only be configured alongside an `accessToken`. With an API key the profile and mode are fixed by the key
 * itself, and the Mollie API rejects these parameters.
 */
export interface ParameterDefaults {
  /**
   * The profile the entity belongs to. Required on most requests when using an OAuth access token; set it here to
   * avoid having to pass it on every call.
   */
  profileId?: string;
  /**
   * Set to `true` to operate in test mode. Only relevant for OAuth access tokens; set it here to avoid having to pass
   * it on every call.
   */
  testmode?: boolean;
}

type Options = Xor<
  {
    /**
     * The Mollie API key, starting with `'test_'` or `'live_'`.
     */
    apiKey: string;
  },
  {
    /**
     * OAuth access token, starting with `'access_'`.
     */
    accessToken: string;
    /**
     * Default values for `profileId` and `testmode`, applied to every request that accepts them unless the individual
     * call already specifies the value. Only available with an `accessToken`, as these parameters are meaningless (and
     * rejected) for API key credentials.
     */
    parameterDefaults?: ParameterDefaults;
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
   * By default, this client refuses to run in a browser-like environment, as doing so would ship your credentials (API
   * key or access token) to the public and allow anyone to act on your behalf. Set this to `true` only if you understand
   * the risks and have appropriate mitigations in place (e.g. a short-lived, narrowly-scoped token).
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
