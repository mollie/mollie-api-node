const iteratorPropertyDescriptor = {
  value: function getIterator<T>(this: T) {
    return this;
  },
};

export default function makeIterable<T, I extends AsyncIterator<T>>(iterator: I) {
  return Object.defineProperty(iterator, Symbol.asyncIterator, iteratorPropertyDescriptor) as I & { [Symbol.asyncIterator]: I };
}
