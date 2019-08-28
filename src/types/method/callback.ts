import { IMethod } from '../method';
import { IList } from '../list';

/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, method?: IMethod) => void;
/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, methods?: IList<IMethod>) => void;
