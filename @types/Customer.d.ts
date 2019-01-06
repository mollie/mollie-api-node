declare namespace Mollie {
  interface Customer {
    name?: string;
    email?: string;
    locale: Locale;
    metadata?: any;

    // Access token parameters
    testmode?: boolean;
  }
}
