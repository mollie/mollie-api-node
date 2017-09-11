/**
 * A list helper class
 */
export default class List extends Array {
  constructor() {
    super();
    this.totalCount = null;
    this.offset = null;
    this.links = null;
  }
}
