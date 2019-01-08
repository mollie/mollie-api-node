import { IMethod } from '../method';
import { List } from '../list';

export type GetCallback = (error: any, method: IMethod) => void;
export type ListCallback = (error: any, methods: List<IMethod>) => void;
