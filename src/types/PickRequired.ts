export type PickRequired<T, K extends keyof T> = {
  [P in K]-?: T[P];
};
