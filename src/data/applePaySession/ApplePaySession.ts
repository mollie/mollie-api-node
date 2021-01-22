import Model from '../Model';
import Seal from '../../types/Seal';
import commonHelpers from '../commonHelpers';

/**
 * @see https://docs.mollie.com/reference/v2/permissions-api/get-permission
 */
export interface ApplePaySessionData extends Model<'applePaySession', string> {
  epochTimestamp: number;
  expiresAt: number;
  merchantSessionIdentifier: string;
  nonce: string;
  merchantIdentifier: string;
  domainName: string;
  displayName: string;
  signature: string;
}

type ApplePaySession = Seal<ApplePaySessionData, typeof commonHelpers>;

export default ApplePaySession;

export function injectPrototypes(input: ApplePaySessionData): ApplePaySession {
  return Object.assign(Object.create(commonHelpers), input);
}
