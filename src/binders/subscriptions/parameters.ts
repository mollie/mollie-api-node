import { PaginationParameters } from '../../types/parameters';

export type ListParameters = PaginationParameters & {
  profileId?: string;
  testmode?: boolean;
};
