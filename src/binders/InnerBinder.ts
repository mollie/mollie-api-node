import Binder from './Binder';
import Maybe from '../types/Maybe';

/**
 * A binder within a parent object. For example: a binder for payments made by a single customer.
 */
export default class InnerBinder<R, T extends R> extends Binder<R, T> {
  protected defaultParentId: Maybe<string>;

  /**
   * Returns the passed parent identifier, or `defaultParentId` as set by `withParent` if the former is `undefined`.
   */
  protected getParentId(input: Maybe<string>): Maybe<string> {
    return input ?? this.defaultParentId;
  }

  /**
   * Sets the default parent identifier for future calls to the methods of this binder to the identifier of the passed
   * parent object. If `undefined` or `null` or an otherwise falsy value is passed, or an object with a falsy
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
