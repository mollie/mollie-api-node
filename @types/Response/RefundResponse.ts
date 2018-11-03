///<reference path="../global.d.ts"/>
declare namespace Mollie {
  interface RefundResponse {
    resource: string;
    id: string;
    amount: Amount;
    status: string;
    createdAt: string;
    description: string;
    paymentId: string;
    settlementAmount?: Amount;
    _links: Links;
  }
}
