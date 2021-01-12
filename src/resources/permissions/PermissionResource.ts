import ApiError from '../../errors/ApiError';
import Callback from '../../types/Callback';
import checkId from '../../plumbing/checkId';
import List from '../../data/list/List';
import NetworkClient from '../../NetworkClient';
import Permission, { injectPrototypes, PermissionData } from '../../data/permissions/Permission';
import Resource from '../Resource';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import renege from '../../plumbing/renege';

export default class PermissionsResource extends Resource<PermissionData, Permission> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(): string {
    return 'permissions';
  }

  /**
   * All API actions through OAuth are by default protected for privacy and/or money related reasons and therefore
   * require specific permissions. These permissions can be requested by apps during the OAuth authorization flow. The
   * Permissions resource allows the app to check whether an API action is (still) allowed by the authorization.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/permissions-api/get-permission
   */
  public get(id: string): Promise<Permission>;
  public get(id: string, callback: Callback<Permission>): void;
  public get(id: string) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'permission')) {
      throw new ApiError('The permission id is invalid');
    }
    return this.networkClient.get(`${this.getResourceUrl()}/${id}`);
  }

  /**
   * List all permissions available with the current app access token. The list is not paginated.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/permissions-api/list-permissions
   */
  public list(): Promise<List<Permission>>;
  public list(callback: Callback<List<Permission>>): void;
  public list() {
    if (renege(this, this.list, ...arguments)) return;
    return this.networkClient.list(this.getResourceUrl(), 'permissions', {}).then(result => this.injectPaginationHelpers<undefined>(result, this.list, undefined));
  }
}
