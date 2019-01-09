import { ICapture } from './index';
import { List } from '../../list';

export type GetCallback = (error: any, capture: ICapture) => void;
export type ListCallback = (error: any, captures: List<ICapture>) => void;
