import { MandateData, MandateStatus } from './data';
import commonHelpers from '../../commonHelpers';

export default {
  ...commonHelpers,
  /**
   * Returns whether the mandate is valid.
   */
  isValid: function isValid(this: MandateData): boolean {
    return this.status === MandateStatus.valid;
  },
};
