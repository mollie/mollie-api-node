declare namespace Mollie {
  interface SubscriptionResponse {
    resource: string,
    id: string,
    mode: ApiMode,
    status: SubscriptionStatus,
    amount: Amount,
    times: number,
    timesRemaining: number,
    interval: string,
    startDate: string,
    nextPaymentDate?: string,
    description: string,
    method: string,
    mandateId?: string,
    canceledAt: string,
    webhookUrl: string,
    metadata: any,
    _links: Links,

    // Access token parameters
    testmode?: boolean,
  }
}
