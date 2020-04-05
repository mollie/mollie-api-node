import Resource from './Resource';
import Maybe from '../types/Maybe';

export default class ParentedResource<R, T extends R> extends Resource<R, T> {
  protected defaultParentId: Maybe<string>;

  /**
   * Returns the passed parent identifier, or `defaultParentId` as set by `withParent` if the former is `undefined`.
   */
  protected getParentId(input: Maybe<string>): Maybe<string> {
    if (input == undefined) {
      return this.defaultParentId;
    }
    return input;
  }

  /**
   * Sets the default parent identifier for future calls to the methods of this resource to the identifier of the
   * passed parent object. If `undefined` or `null` or an otherwise falsy value is passed, or an object with a falsy
   * identifier, this method is a no-op.
   *
   * @since 1.1.1
   *
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public withParent(parent: { id: string }): this {
    if (parent && parent.id) {
      this.defaultParentId = parent.id;
    }
    return this;
  }
}
