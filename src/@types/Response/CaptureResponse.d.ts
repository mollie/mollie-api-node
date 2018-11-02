declare namespace Mollie {
  interface CaptureResponse {
    resource: string;
    id: string;
    mode: ApiMode;
    amount: Amount;
    settlementAmount: Amount;
    paymentId: string;
    shipmentId?: string;
    settlementId?: string;
    createdAt: string;
    _links: Links;
  }
}
