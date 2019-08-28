import { ICapture } from './index';
import { IList } from '../../list';

/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, capture?: ICapture) => void;
/**
 * @deprecated since 3.0.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, captures?: IList<ICapture>) => void;
