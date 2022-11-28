import { PaymentMethod } from '../../../types';
import { IdempotencyParameter } from '../../../types/parameters';

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
