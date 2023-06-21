import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type Links } from '../global';
import Helper from '../Helper';
import type Model from '../Model';

export interface PermissionData extends Model<'permission'> {
  /**
   * A short description of what the permission allows.
   *
   * @see https://docs.mollie.com/reference/v2/permissions-api/get-permission?path=description#response
   */
  description: string;
  /**
   * Whether this permission is granted to the app by the organization or not.
   *
   * @see https://docs.mollie.com/reference/v2/permissions-api/get-permission?path=granted#response
   */
  granted: boolean;
  /**
   * An object with several URL objects relevant to the permission. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/permissions-api/get-permission?path=_links#response
   */
  _links: PermissionLinks;
}

type Permission = Seal<PermissionData, Helper<PermissionData, Permission>>;

export default Permission;

export type PermissionLinks = Links;

export function transform(networkClient: TransformingNetworkClient, input: PermissionData): Permission {
  return Object.assign(Object.create(new Helper<PermissionData, Permission>(networkClient, input._links)), input);
}
