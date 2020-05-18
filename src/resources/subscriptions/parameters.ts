import { CommonListParameters } from '../../types/parameters';

export type ListParameters = CommonListParameters & {
  profileId?: string;
  testmode?: boolean;
};
