declare namespace Mollie {
  interface IMandate {
    resource: string;
    id: string;
    mode: ApiMode;
    status: Mollie.Mandate.Status;
    method: Mollie.Mandate.Method;
    details: Mollie.Mandate.IDetails;
    mandateReference: string;
    signatureDate: string;
    createdAt: string;
    _links: ILinks;

    // Access token parameters
    testmode?: boolean;
  }

  namespace Mandate {
    type IDetails = IDetailsCreditCard | IDetailsDirectDebit;

    interface IDetailsDirectDebit {
      consumerName: string;
      consumerAccount: string;
      consumerBic: string;
    }

    interface IDetailsCreditCard {
      cardHolder: string;
      cardNumber: string;
      cardLabel: CardLabel;
      cardFingerprint: string;
      cardExpireDate: string;
    }

    enum Method {
      directdebit = 'directdebit',
      creditcard = 'creditcard',
    }

    enum Status {
      valid = 'valid',
      invalid = 'invalid',
      pending = 'pending',
    }

    namespace Params {
      interface ICreate {
        customerId: string;
        method: Mollie.Mandate.Method;
        consumerName: string;
        consumerAccount: string;
        consumerBic?: string;
        signatureDate?: string;
        mandateReference?: string;

        // Access token parameters
        testmode?: boolean;
      }

      interface IGet {
        customerId: string;

        // Access token parameters
        testmode?: boolean;
      }

      interface IList {
        customerId: string;
        from?: string;
        limit?: number;

        // Access token parameters
        testmode?: boolean;
      }

      interface IRevoke {
        customerId: string,

        // Access token parameters
        testmode?: boolean;
      }
    }

    namespace Callback {
      type Create = (error: any, mandate: IMandate) => void;
      type Get = (error: any, mandate: IMandate) => void;
      type List = (error: any, mandates: Mollie.List<IMandate>) => void;
      type Revoke = (error: any, success: boolean) => void;
    }
  }
}

