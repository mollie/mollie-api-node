declare namespace Mollie {
  interface ChargebackResponse {
    id: string,
    amount: Amount,
    settleAmount: Amount,
    createdAt: string,
    reversedAt: string,
    paymentId: string,
    _links: Links,
  }
}
