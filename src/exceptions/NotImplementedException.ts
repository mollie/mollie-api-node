/**
 * @since 2.2.0
 */
export default class NotImplementedException extends Error {
  public apiName: string;

  public constructor(props, apiName) {
    super(props);
    this.apiName = apiName;
  }
}
