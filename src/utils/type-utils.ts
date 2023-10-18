export type DeepPartial<T> = T extends Array<infer TItem>
  ? Array<DeepPartial<TItem>>
  : T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
