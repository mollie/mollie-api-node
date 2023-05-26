import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import List from '../../data/list/List';
import Permission, { PermissionData } from '../../data/permissions/Permission';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';
import Binder from '../Binder';

const pathSegment = 'permissions';

export default class PermissionsBinder extends Binder<PermissionData, Permission> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve the details on a specific permission, and see if the permission is granted to the current app access token.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/permissions-api/get-permission
   */
  public get(id: string): Promise<Permission>;
  public get(id: string, callback: Callback<Permission>): void;
  public get(id: string) {
    if (renege(this, this.get, ...arguments)) return;
    return this.networkClient.get<PermissionData, Permission>(`${pathSegment}/${id}`);
  }

  /**
   * List all permissions available with the current app access token. The list is not paginated.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/permissions-api/list-permissions
   */
  public list(): Promise<List<Permission>>;
  public list(callback: Callback<List<Permission>>): void;
  public list() {
    if (renege(this, this.list, ...arguments)) return;
    return this.networkClient.list<PermissionData, Permission>(pathSegment, 'permissions', {}).then(result => this.injectPaginationHelpers<undefined>(result, this.list, undefined));
  }
}
