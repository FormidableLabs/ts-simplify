import { DeepPartial } from "../utils/type-utils";

export type Foo = {
  a: "A";
  b?: "B";
  nested: Nested;
  array: Array<Nested>;
};

type Nested = {
  c: "C";
  d?: "D";
  e: Array<"E">;
};

export type FooPartial = Partial<Foo>;

export type FooRequired = Required<Foo>;

export type FooDeepPartial = DeepPartial<Foo>;
