export type PickOptional<T, K extends keyof T> = {
  [P in K]?: T[P];
};
