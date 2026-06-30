import type { PaginationParameters, SortParameter, TestModeParameter, ThrottlingParameter } from '../../../types/parameters';
import type { CreateParameters as PaymentCreateParameters } from '../../payments/parameters';

interface ContextParameters {
  customerId: string;
}

export type CreateParameters = Omit<PaymentCreateParameters, 'customerId'> & ContextParameters;

export type PageParameters = ContextParameters &
  PaginationParameters &
  SortParameter &
  TestModeParameter & {
    /**
     * The identifier referring to the [profile](get-profile) you wish to retrieve the resources for.
     *
     * Most API credentials are linked to a single profile. In these cases the `profileId` must not be sent. For organization-level credentials such as OAuth access tokens however, the `profileId`
     * parameter is required.
     *
     * @see https://docs.mollie.com/reference/list-customer-payments?path=profileId#parameters
     */
    profileId?: string;
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
