declare namespace Mollie {
  interface ShipmentResponse {
    resource: string;
    id: string;
    orderId: string;
    createdAt: string;
    tracking: Tracking | null;
    lines: Array<FullOrderLine>;
    _links: Links;

    // Access token parameters
    testmode?: boolean;
  }
}
