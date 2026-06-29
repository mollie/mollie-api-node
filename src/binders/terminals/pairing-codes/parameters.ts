import { type TerminalPairingCodeData, type TerminalPairingCodeInclude } from '../../../data/terminals/pairing-codes/data';
import { type PaginationParameters, type SortParameter, type ThrottlingParameter } from '../../../types/parameters';
import type MaybeArray from '../../../types/MaybeArray';

export type CreateParameters = Pick<TerminalPairingCodeData, 'profileId'> & {
  /**
   * Include additional information in the response.
   *
   * Possible values: `details.qrCode` (include a QR code object).
   *
   * __Note:__ In the REST API this is not part of the request body, but a query string parameter. It is included here for consistency.
   *
   * @see https://docs.mollie.com/reference/terminals-request-pairing-code?path=include#parameters
   */
  include?: MaybeArray<TerminalPairingCodeInclude>;
};

export type GetParameters = {
  /**
   * Include additional information in the response.
   *
   * Possible values: `details.qrCode` (include a QR code object).
   *
   * @see https://docs.mollie.com/reference/terminals-get-pairing-code?path=include#parameters
   */
  include?: MaybeArray<TerminalPairingCodeInclude>;
};

export type PageParameters = PaginationParameters &
  SortParameter & {
    /**
     * The identifier referring to the profile you wish to retrieve pairing codes for.
     *
     * @see https://docs.mollie.com/reference/terminals-list-pairing-codes?path=profileId#parameters
     */
    profileId?: string;
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
