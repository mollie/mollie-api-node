import { type PaymentMethod } from '../../../types';
import { type IdempotencyParameter } from '../../../types/parameters';

export interface Parameters extends IdempotencyParameter {
  /**
   * The ID of the profile, for example `pfl_v9hTwCvYqw`.
   */
  profileId: string;
  /**
   * The ID of the method, for example `ideal`.
   */
  id: `${PaymentMethod}`;
}
