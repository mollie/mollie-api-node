import { IMethod } from '../method';
import { List } from '../list';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, method?: IMethod) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, methods?: List<IMethod>) => void;
