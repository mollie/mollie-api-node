declare namespace Mollie {
  interface CustomerResponse {
    resource: string,
    id: string,
    mode: ApiMode,
    name: string,
    email: string,
    locale: Locale,
    metadata: any,
    createdAt: string,
    _links: Links,

    // Access token parameters
    testmode?: boolean,
  }
}
