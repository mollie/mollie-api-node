import { ICapture } from '../../types/capture/index';
import { List } from '../../types/list';

export type GetCallback = (error: any, capture: ICapture) => void;
export type ListCallback = (error: any, captures: List<ICapture>) => void;
