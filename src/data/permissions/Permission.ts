import { Links } from '../global';
import Model from '../Model';
import Seal from '../../types/Seal';
import commonHelpers from '../commonHelpers';

/**
 * @see https://docs.mollie.com/reference/v2/permissions-api/get-permission
 */
export interface PermissionData extends Model<'permission', string> {
  /**
   * A short description of what the permission allows.
   */
  description: string;
  /**
   * Whether this permission is granted to the app by the organization or not.
   */
  granted: boolean;
  /**
   * An object with several URL objects relevant to the permission.
   */
  _links: PermissionLinks;
}

type Permission = Seal<PermissionData, typeof commonHelpers>;

export default Permission;

export interface PermissionLinks extends Links {}

export function injectPrototypes(input: PermissionData): Permission {
  return Object.assign(Object.create(commonHelpers), input);
}
