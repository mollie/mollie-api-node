export interface IListParams {
  customerId: string;
  subscriptionId: string;

  from?: string;
  limit?: number;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
}
