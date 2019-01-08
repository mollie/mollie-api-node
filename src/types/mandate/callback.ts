import { IMandate } from '../mandate';
import { List } from '../list';

export type CreateCallback = (error: any, mandate: IMandate) => void;
export type GetCallback = (error: any, mandate: IMandate) => void;
export type ListCallback = (error: any, mandates: List<IMandate>) => void;
export type RevokeCallback = (error: any, success: boolean) => void;
