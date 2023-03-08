import { IdempotencyParameter } from '../../../types/parameters';

export interface Parameters extends IdempotencyParameter {
  /**
   * The ID of the profile, for example `pfl_v9hTwCvYqw`.
   */
  profileId: string;
  /**
   * The ID of the issuer, for example `appetiz`.
   */
  id: string;
}

export type CreateParameters = Parameters & {
  /**
   * The contract id of the related contractor. For the first call that will be made to an issuer of the contractor, this field is required. You do not have to provide the same contract id for other
   * issuers of the same contractor. Update of the contract ID will be possible through making the same call again with different contract ID value until the contract id is approved by the contractor.
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/enable-voucher-issuer?path=contractId#parameters
   */
  contractId?: string;
};
