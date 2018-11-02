declare namespace Mollie {
  interface Mandate {
    method: MandateMethod;
    consumerName: string;
    consumerAccount: string;
    consumerBic?: string;
    signatureDate?: string;
    mandateReference?: string;

    // Access token parameters
    testmode?: boolean;
  }

  type MandateDetails = MandateDetailsCreditCard | MandateDetailsDirectDebit;
  interface MandateDetailsDirectDebit {
    consumerName: string;
    consumerAccount: string;
    consumerBic: string;
  }

  interface MandateDetailsCreditCard {
    cardHolder: string;
    cardNumber: string;
    cardLabel: CardLabel;
    cardFingerprint: string;
    cardExpireDate: string;
  }

  type MandateMethod = 'directdebit';
  type MandateStatus = 'valid' | 'pending' | 'invalid';
}
