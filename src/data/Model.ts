import Maybe from '../types/Maybe';

export default interface Model<R extends string, I extends Maybe<string> = string> {
  /**
   * Indicates the kind of entity this is.
   */
  resource: R;
  /**
   * The unique identifier for this entity.
   */
  id: I;
}
