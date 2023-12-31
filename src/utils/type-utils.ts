export type PartialDeep<T> = T extends Array<infer TItem>
  ? Array<PartialDeep<TItem>>
  : T extends object
  ? {
      [P in keyof T]?: PartialDeep<T[P]>;
    }
  : T;

export type RequiredDeep<T> = T extends Array<infer TItem>
  ? Array<RequiredDeep<TItem>>
  : T extends object
  ? {
      [P in keyof T]-?: RequiredDeep<T[P]>;
    }
  : T;

// A copy of this type is hard-coded in the `simplify-types.ts` code
export type SimplifyDeep<T> = T extends (...args: infer A) => infer R
  ? (...args: SimplifyDeep<A>) => SimplifyDeep<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: SimplifyDeep<O[K]> }
    : never
  : T;
