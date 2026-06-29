import { type PaginationParameters, type SortParameter, type TestModeParameter, type ThrottlingParameter } from '../../../types/parameters';

interface ContextParameters extends TestModeParameter {
  customerId: string;
  subscriptionId: string;
}

export type PageParameters = ContextParameters &
  PaginationParameters &
  SortParameter & {
    /**
     * The identifier referring to the [profile](https://docs.mollie.com/reference/get-profile) you wish to retrieve the payments for.
     *
     * Most API credentials are linked to a single profile. In these cases the `profileId` must not be sent. For organization-level credentials such as OAuth access tokens however, the `profileId` parameter is required.
     *
     * @see https://docs.mollie.com/reference/list-subscription-payments?path=profileId#parameters
     */
    profileId?: string;
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
