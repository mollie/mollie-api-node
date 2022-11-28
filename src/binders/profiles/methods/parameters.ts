import { PaymentMethod } from '../../../types';

export interface Parameters {
  /**
   * The ID of the profile, for example `pfl_v9hTwCvYqw`.
   */
  profileId: string;
  /**
   * The ID of the method, for example `ideal`.
   */
  id: `${PaymentMethod}`;
}
