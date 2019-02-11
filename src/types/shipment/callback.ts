import { IShipment } from './index';
import { IList } from '../list';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (error: any, shipment?: IShipment) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, shipment?: IShipment) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, shipments?: IList<IShipment>) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type UpdateCallback = (error: any, shipment?: IShipment) => void;
