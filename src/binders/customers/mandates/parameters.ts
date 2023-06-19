import { MandateData } from '../../../data/customers/mandates/data';
import { IdempotencyParameter, PaginationParameters, ThrottlingParameter } from '../../../types/parameters';

interface ContextParameters {
  customerId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters &
  Pick<MandateData, 'method'> & {
    /**
     * The consumer's name.
     *
     * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate?path=consumerName#parameters
     */
    consumerName?: string;
    /**
     * The consumer's IBAN. Required for `directdebit` mandates.
     *
     * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate?path=consumerAccount#parameters
     */
    consumerAccount?: string;
    /**
     * The consumer's bank's BIC.
     *
     * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate?path=consumerBic#parameters
     */
    consumerBic?: string;
    /**
     * The consumer's email address. Required for `paypal` mandates.
     *
     * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate?path=consumerEmail#parameters
     */
    consumerEmail?: string;
    /**
     * The date when the mandate was signed in `YYYY-MM-DD` format.
     *
     * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate?path=signatureDate#parameters
     */
    signatureDate?: string;
    /**
     * A custom mandate reference. Use an unique `mandateReference` as some banks decline a Direct Debit payment if the `mandateReference` is not unique.
     *
     * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate?path=mandateReference#parameters
     */
    mandateReference?: string;
    /**
     * The billing agreement ID given by PayPal. For example: `B-12A34567B8901234CD`. Required for `paypal` mandates.
     *
     * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate?path=paypalBillingAgreementId#parameters
     */
    paypalBillingAgreementId?: string;
  } & IdempotencyParameter;

export type GetParameters = ContextParameters;

export type PageParameters = ContextParameters & PaginationParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;

export type RevokeParameters = ContextParameters & IdempotencyParameter;
