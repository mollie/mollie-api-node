declare namespace Mollie {
  interface MandateResponse {
    resource: string,
    id: string,
    mode: ApiMode,
    status: MandateStatus,
    method: 'directdebit'|'creditcard'
    details: MandateDetails,
    mandateReference: string,
    signatureDate: string,
    createdAt: string,
    _links: Links,

    // Access token parameters
    testmode?: boolean,
  }
}
