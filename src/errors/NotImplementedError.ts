/**
 * @since 2.2.0
 */
export default class NotImplementedError extends Error {
  public apiName: string;

  public constructor(message, apiName) {
    super(message);

    this.apiName = apiName;
  }
}
