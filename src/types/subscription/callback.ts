import { IList } from '@mollie-types/list';
import { ISubscription } from '@mollie-types/subscription';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (error: any, subscription?: ISubscription) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, subscription?: ISubscription) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, subscriptions?: IList<ISubscription>) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type UpdateCallback = (error: any, subscription?: ISubscription) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CancelCallback = (error: any, success?: boolean) => void;
