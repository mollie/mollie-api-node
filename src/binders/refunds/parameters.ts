import { type RefundEmbed } from '../../data/refunds/data';
import { type PaginationParameters, type SortParameter, type TestModeParameter, type ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters &
  SortParameter &
  TestModeParameter & {
    /**
     * The identifier referring to the [profile](https://docs.mollie.com/reference/get-profile) you wish to retrieve the resources for.
     *
     * Most API credentials are linked to a single profile. In these cases the `profileId` must not be sent. For organization-level credentials such as OAuth access tokens however, the `profileId`
     * parameter is required.
     *
     * @see https://docs.mollie.com/reference/list-all-refunds?path=profileId#parameters
     */
    profileId?: string;
    /**
     * This endpoint allows embedding related API items by appending the following values via the `embed` query string parameter:
     *
     * - `payment`: Embed the payment related to this refund.
     *
     * @see https://docs.mollie.com/reference/list-all-refunds?path=embed#parameters
     */
    embed?: RefundEmbed[];
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
