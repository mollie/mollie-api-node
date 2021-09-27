import { MandateData, MandateStatus } from './data';
import Helper from '../../Helper';
import Mandate from './Mandate';

export default class MandateHelper extends Helper<MandateData, Mandate> {
  /**
   * Returns whether the mandate is valid.
   */
  public isValid(this: MandateData): boolean {
    return this.status === MandateStatus.valid;
  }
}
