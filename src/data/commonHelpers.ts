import Model from './Model';

export default {
  /**
   * Converts this object to a plain one.
   */
  toPlainObject: function toPlainObject(this: Model<any>): any {
    // Previously, we used Lodash' toPlainObject here. However, back then we used classes for our models instead of
    // interfaces. This should have the same effect on the new object as _.toPlainObject had on the old ones: returning
    // a plain object with no prototype.
    return Object.assign({}, this);
  },
};
