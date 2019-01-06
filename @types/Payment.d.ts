declare namespace Mollie {
  interface Payment {
    amount: Amount;
    description: string;
    redirectUrl: string;
    webhookUrl?: string;
    locale?: Locale;
    method?: Method;
    metadata?: any;
    sequenceType?: string;
    customerId?: string;
    mandateId?: string;
    billingEmail?: string;
    billingAddress?: Address;
    shippingAddress?: Address;
    issuer: GiftcardIssuer | IdealIssuer | KbcIssuer;
    dueDate?: string;
    customerReference?: string;
    consumerName?: string;
    consumerAccount?: string;
    details?: any;

    // Access token parameters
    profileId?: string;
    testmode?: boolean;
    applicationFee?: Amount;
  }

  type PaymentStatus =
    | 'open'
    | 'canceled'
    | 'pending'
    | 'authorized'
    | 'expired'
    | 'failed'
    | 'paid';
}
