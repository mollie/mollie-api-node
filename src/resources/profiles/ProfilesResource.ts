import { CreateParameters, ListParameters, UpdateParameters } from './parameters';
import { ProfileData } from '../../data/profiles/data';
import ApiError from '../../errors/ApiError';
import Callback from '../../types/Callback';
import List from '../../data/list/List';
import Profile, { injectPrototypes } from '../../data/profiles/Profile';
import Resource from '../Resource';
import checkId from '../../plumbing/checkId';
import renege from '../../plumbing/renege';

export default class ProfilesResource extends Resource<ProfileData, Profile> {
  protected getResourceUrl(): string {
    return 'profiles';
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * In order to process payments, you need to create a website profile. A website profile can easily be created via
   * the Dashboard manually. However, the Mollie API also allows automatic profile creation via the Profiles API.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/create-profile
   */
  public create(parameters: CreateParameters): Promise<Profile>;
  public create(parameters: CreateParameters, callback: Callback<Profile>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    return this.network.post(this.getResourceUrl(), parameters);
  }

  /**
   * Retrieve details of a profile, using the profile's identifier.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile
   */
  public get(id: string): Promise<Profile>;
  public get(id: string, callback: Callback<Profile>): void;
  public get(id: string) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'profile')) {
      throw new ApiError('The profile id is invalid');
    }
    return this.network.get(`${this.getResourceUrl()}/${id}`);
  }

  /**
   * Use this API if you are creating a plugin or SaaS application that allows users to enter a Mollie API key, and you
   * want to give a confirmation of the website profile that will be used in your plugin or application.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/get-profile-me
   */
  public getCurrent(): Promise<Profile>;
  public getCurrent(callback: Callback<Profile>): void;
  public getCurrent() {
    if (renege(this, this.getCurrent, ...arguments)) return;
    return this.network.get(`${this.getResourceUrl()}/me`);
  }

  /**
   * Retrieve all profiles available on the account.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/list-profiles
   */
  public list(parameters?: ListParameters): Promise<List<Profile>>;
  public list(parameters: ListParameters, callback: Callback<List<Profile>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.network.list(this.getResourceUrl(), 'profiles', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }

  /**
   * A profile is required to process payments. A profile can easily be created and updated via the Dashboard manually.
   * However, the Mollie API also allows automatic profile creation and updates via the Profiles API.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/update-profile
   */
  public update(id: string, parameters: UpdateParameters): Promise<Profile>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Profile>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    if (!checkId(id, 'profile')) {
      throw new ApiError('The profile id is invalid');
    }
    return this.network.patch(`${this.getResourceUrl()}/${id}`, parameters);
  }

  /**
   * This endpoint enables profile deletions, rendering the profile unavailable for further API calls and transactions.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/profiles-api/delete-profile
   */
  public delete(id: string): Promise<true>;
  public delete(id: string, callback: Callback<List<true>>): void;
  public delete(id: string) {
    if (renege(this, this.delete, ...arguments)) return;
    if (!checkId(id, 'profile')) {
      throw new ApiError('The profile id is invalid');
    }
    return this.network.delete<true>(`${this.getResourceUrl()}/${id}`);
  }
}
