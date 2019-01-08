export interface IGetParams {
  // Access token parameters
  /** Set this to true to retrieve a test mode capture. */
  testmode?: boolean;
}

export interface IListParams {
  // Access token parameters
  /** Set this to true to retrieve captures for a test mode payment. */
  testmode?: boolean;
}
