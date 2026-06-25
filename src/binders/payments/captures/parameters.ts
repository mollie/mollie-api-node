import { type CaptureData, type CaptureEmbed, type CaptureInclude } from '../../../data/payments/captures/data';
import type MaybeArray from '../../../types/MaybeArray';
import { type IdempotencyParameter, type PaginationParameters, type TestModeParameter, type ThrottlingParameter } from '../../../types/parameters';
import type PickOptional from '../../../types/PickOptional';

interface ContextParameters {
  paymentId: string;
}

export type CreateParameters = ContextParameters & PickOptional<CaptureData, 'amount' | 'description' | 'metadata'> & IdempotencyParameter;

export type GetParameters = ContextParameters &
  TestModeParameter & {
    /**
     * Using the `embed` query parameter, you can request related resources to be embedded in the response.
     * * `payment`: Embed the payment this capture was created for.
     *
     * __Note:__ In the REST API, this is not part of the request body, but a query parameter. It is included here for consistency.
     */
    embed?: MaybeArray<CaptureEmbed>;
    /**
     * @deprecated Use `embed` instead. The Captures API embeds related resources via the `embed` query parameter,
     * not `include` — passing `include` had no effect.
     */
    include?: MaybeArray<CaptureInclude>;
  };

export type PageParameters = ContextParameters &
  PaginationParameters &
  TestModeParameter & {
    /**
     * Using the `embed` query parameter, you can request related resources to be embedded in the response.
     * * `payment`: Embed the payment this capture was created for.
     *
     * __Note:__ In the REST API, this is not part of the request body, but a query parameter. It is included here for consistency.
     */
    embed?: MaybeArray<CaptureEmbed>;
    /**
     * @deprecated Use `embed` instead. The Captures API embeds related resources via the `embed` query parameter,
     * not `include` — passing `include` had no effect.
     */
    include?: MaybeArray<CaptureInclude>;
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
