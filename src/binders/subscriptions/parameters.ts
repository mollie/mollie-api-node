import { type PaginationParameters, type SortParameter, type TestModeParameter, type ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters &
  SortParameter &
  TestModeParameter & {
    /**
     * The identifier referring to the [profile](https://docs.mollie.com/reference/get-profile) you wish to retrieve the subscriptions for.
     *
     * Most API credentials are linked to a single profile. In these cases the `profileId` is already implied. To retrieve all subscriptions across the organization, use an organization-level API credential and omit the `profileId` parameter.
     *
     * @see https://docs.mollie.com/reference/list-all-subscriptions?path=profileId#parameters
     */
    profileId?: string;
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
