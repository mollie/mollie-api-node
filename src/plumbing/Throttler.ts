/**
 * One minute, in milliseconds.
 */
const minute = 60e3;

/**
 * Keeps track of the number of values which have been consumed, as well as the timeframe during which they were
 * consumed. The `throttle` method can be used to throttle if more values are consumed than allowed at any given moment
 * in time, as dictated by the `valuesPerMinute` argument passed into the constructor.
 */
export default class Throttler {
  protected count: number;
  protected readonly start: number;
  constructor(protected readonly valuesPerMinute: number) {
    this.start = Date.now();
    this.count = 0;
  }

  /**
   * Registers that the passed number of values have been consumed.
   */
  tally(count: number) {
    this.count += count;
  }

  /**
   * If more values have been consumed than allowed at this moment in time, a promise is returned which is resolved as
   * soon as this is no longer the case. Otherwise, `undefined` is returned.
   */
  throttle() {
    const now = Date.now();
    const timeOfNextValue = this.start + minute * Math.floor(this.count / this.valuesPerMinute);
    if (now > timeOfNextValue) {
      return;
    }
    return new Promise<void>(resolve => setTimeout(resolve, timeOfNextValue - now));
  }
}
