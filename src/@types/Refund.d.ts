declare namespace Mollie {
  interface Refund {
    amount: Amount,
    description?: string,

    // Access token parameters
    testmode?: boolean,
  }
}
