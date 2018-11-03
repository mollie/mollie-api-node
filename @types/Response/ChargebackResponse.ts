declare namespace Mollie {
  interface ChargebackResponse {
    resource: string;
    id: string;
    amount: Amount;
    settlementAmount: Amount;
    createdAt: string;
    reversedAt: string;
    paymentId: string;
    _links: Links;
  }
}
