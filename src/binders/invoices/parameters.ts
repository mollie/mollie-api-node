import { type PaginationParameters, type SortParameter, type ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters &
  SortParameter & {
    /**
     * Use this parameter to filter for invoices with a specific invoice reference, for example `2024.10000`.
     */
    reference?: string;
    /**
     * Use this parameter to filter for invoices from a specific year, for example `2024`.
     */
    year?: string;
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
