export interface ApplePaySessionData {
  epochTimestamp: number;
  expiresAt: number;
  merchantSessionIdentifier: string;
  nonce: string;
  merchantIdentifier: string;
  domainName: string;
  displayName: string;
  signature: string;
}

type ApplePaySession = Readonly<ApplePaySessionData>;

export default ApplePaySession;
