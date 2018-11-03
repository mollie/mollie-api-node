declare namespace Mollie {
  interface Shipment {
    lines: Array<OrderLine>;
    tracking?: Tracking;

    // Access token parameters
    testmode?: boolean;
  }

  interface Tracking {
    carrier: string;
    code: string;
    url?: string;
  }
}
