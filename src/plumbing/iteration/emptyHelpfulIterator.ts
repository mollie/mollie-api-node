import HelpfulIterator from './HelpfulIterator';
import makeAsync from './makeAsync';

/**
 * A `HelpfulIterator` instance with an empty underlying sequence.
 */
export default new HelpfulIterator(makeAsync([][Symbol.iterator]()));
