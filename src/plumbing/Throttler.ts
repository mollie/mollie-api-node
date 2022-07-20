/**
 * Six seconds, in milliseconds.
 */
const sixSeconds = 6e3;

/**
 * Keeps track of the number of values which have been consumed, as well as the timeframe during which they were
 * consumed. The `throttle` method can be used to throttle if more values are consumed than allowed at any given moment
 * in time (overconsumption), as dictated by the `valuesPerMinute` argument passed into the constructor.
 */
export default class Throttler {
  protected count: number;
  protected readonly start: number;
  protected readonly valuesPerSixSeconds: number;
  constructor(valuesPerMinute: number) {
    this.valuesPerSixSeconds = valuesPerMinute / 10;
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
   * If more values have been consumed than allowed at this moment in time (overconsumption), a promise is returned
   * which is resolved as soon as this is no longer the case. Otherwise, `undefined` is returned.
   */
  throttle() {
    const now = Date.now();
    const timeOfNextValue = this.start + sixSeconds * Math.floor(this.count / this.valuesPerSixSeconds);
    if (now > timeOfNextValue) {
      return;
    }
    return new Promise<void>(resolve => setTimeout(resolve, timeOfNextValue - now));
  }
}
