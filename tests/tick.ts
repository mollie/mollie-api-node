import { run } from 'ruply';

/**
 * Attempts to clear the microtask queue.
 */
export default run(setTimeout, setTimeout => async (count = 6) => {
  while (count-- != 0) {
    await new Promise(resolve => setTimeout(resolve));
  }
});
