import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Page from '../../data/page/Page';
import { ProfileData } from '../../data/profiles/data';
import Profile from '../../data/profiles/Profile';
import ApiError from '../../errors/ApiError';
import checkId from '../../plumbing/checkId';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';
import Binder from '../Binder';
import { CreateParameters, DeleteParameters, IterateParameters, PageParameters, UpdateParameters } from './parameters';

const pathSegment = 'profiles';

export default class ProfilesBinder extends Binder<ProfileData, Profile> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * In order to process payments, you need to create a website profile. A website profile can easily be created via the Dashboard manually. However, the Mollie API also allows automatic profile
   * creation via the Profiles API.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/create-profile
   */
  public create(parameters: CreateParameters): Promise<Profile>;
  public create(parameters: CreateParameters, callback: Callback<Profile>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    return this.networkClient.post<ProfileData, Profile>(pathSegment, parameters);
  }

  /**
   * Retrieve details of a profile, using the profile's identifier.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile
   */
  public get(id: string): Promise<Profile>;
  public get(id: string, callback: Callback<Profile>): void;
  public get(id: string) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'profile')) {
      throw new ApiError('The profile id is invalid');
    }
    return this.networkClient.get<ProfileData, Profile>(`${pathSegment}/${id}`);
  }

  /**
   * Use this API if you are creating a plugin or SaaS application that allows users to enter a Mollie API key, and you want to give a confirmation of the website profile that will be used in your
   * plugin or application.
   *
   * This is similar to the Get current organization endpoint for OAuth.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile-me
   */
  public getCurrent(): Promise<Profile>;
  public getCurrent(callback: Callback<Profile>): void;
  public getCurrent() {
    if (renege(this, this.getCurrent, ...arguments)) return;
    return this.networkClient.get<ProfileData, Profile>(`${pathSegment}/me`);
  }

  /**
   * Retrieve all profiles available on the account.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.2.0 (as `list`)
   * @see https://docs.mollie.com/reference/v2/profiles-api/list-profiles
   */
  public page(parameters?: PageParameters): Promise<Page<Profile>>;
  public page(parameters: PageParameters, callback: Callback<Page<Profile>>): void;
  public page(parameters?: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<ProfileData, Profile>(pathSegment, 'profiles', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all profiles available on the account.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/list-profiles
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<ProfileData, Profile>(pathSegment, 'profiles', query, valuesPerMinute);
  }

  /**
   * A profile is required to process payments. A profile can easily be created and updated via the Dashboard manually. However, the Mollie API also allows automatic profile creation and updates via
   * the Profiles API.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/update-profile
   */
  public update(id: string, parameters: UpdateParameters): Promise<Profile>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Profile>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    if (!checkId(id, 'profile')) {
      throw new ApiError('The profile id is invalid');
    }
    return this.networkClient.patch<ProfileData, Profile>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * This endpoint enables profile deletions, rendering the profile unavailable for further API calls and transactions.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/profiles-api/delete-profile
   */
  public delete(id: string, parameters?: DeleteParameters): Promise<true>;
  public delete(id: string, parameters: DeleteParameters, callback: Callback<true>): void;
  public delete(id: string, parameters?: DeleteParameters) {
    if (renege(this, this.delete, ...arguments)) return;
    if (!checkId(id, 'profile')) {
      throw new ApiError('The profile id is invalid');
    }
    return this.networkClient.delete<ProfileData, true>(`${pathSegment}/${id}`, parameters);
  }
}
