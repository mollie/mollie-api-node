import { List as MollieList } from '../list';
import { ISubscription } from '../subscription';

export type CreateCallback = (error: any, subscription: ISubscription) => void;
export type GetCallback = (error: any, subscription: ISubscription) => void;
export type ListCallback = (error: any, subscriptions: MollieList<ISubscription>) => void;
export type UpdateCallback = (error: any, subscription: ISubscription) => void;
export type CancelCallback = (error: any, success: boolean) => void;
