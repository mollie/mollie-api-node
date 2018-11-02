declare namespace Mollie {
  interface PaymentResponse {
    resource: string;
    id: string;
    mode: ApiMode;
    createdAt: string;
    status: PaymentStatus;
    isCancelable: boolean;
    authorizedAt?: string;
    paidAt?: string;
    canceledAt?: string;
    expiresAt: string;
    expiredAt?: string;
    failedAt?: string;
    amount: Amount;
    amountRefunded?: Amount;
    amountRemaining?: Amount;
    amountCaptured?: Amount;
    description: string;
    redirectUrl: string | null;
    webhookUrl?: string;
    method: Method;
    metadata: any;
    locale: Locale;
    countryCode?: string;
    profileId: string;
    settlementAmount?: Amount;
    settlementId?: string;
    customerId?: string;
    sequenceType: string;
    mandateId?: string;
    subscriptionId?: string;
    orderId?: string;
    details?: any;
    applicationFee?: {
      amount: Amount;
      description: string;
    };
    _links: Links;
  }
}
