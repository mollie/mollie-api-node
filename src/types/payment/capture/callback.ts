import { ICapture } from './index';
import { IList } from '@mollie-types/list';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, capture?: ICapture) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, captures?: IList<ICapture>) => void;
