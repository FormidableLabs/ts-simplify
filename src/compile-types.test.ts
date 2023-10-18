import { describe, it, expect } from "vitest";

import { compileTypes } from "./compile-types";
import { unindent } from "./utils/unindent";

describe("compile-types", () => {
  function compileTypesTest(code: string) {
    return compileTypes({
      include: ["./src/utils/type-utils.ts", "./src/fixtures/test-file.ts"],
      sourceCode({}) {
        return unindent(`
          import { SimplifyDeep, RequiredDeep, PartialDeep } from './src/utils/type-utils';
          import { Foo } from './src/fixtures/test-file';

          ${code}
        `);
      },
    });
  }

  describe("types are rendered correctly", () => {
    it("with SimplifyDeep", () => {
      const result = compileTypesTest(
        unindent(`
          export type FooSimple = SimplifyDeep<Foo>;
        `)
      );
      expect([result]).toMatchInlineSnapshot(`
        [
          "export type FooSimple = { a: 'A'; b?: 'B' | undefined; nested: { c: 'C'; d?: 'D' | undefined; e: 'E'[]; }; array: { c: 'C'; d?: 'D' | undefined; e: 'E'[]; }[]; };",
        ]
      `);
    });
    it("with RequiredDeep", () => {
      const result = compileTypesTest(
        unindent(`
          export type FooSimple = SimplifyDeep<RequiredDeep<Foo>>;
        `)
      );
      expect([result]).toMatchInlineSnapshot(`
        [
          "export type FooSimple = { a: 'A'; b: 'B'; nested: { c: 'C'; d: 'D'; e: 'E'[]; }; array: { c: 'C'; d: 'D'; e: 'E'[]; }[]; };",
        ]
      `);
    });
    it("with PartialDeep", () => {
      const result = compileTypesTest(
        unindent(`
          export type FooSimple = SimplifyDeep<PartialDeep<Foo>>;
        `)
      );
      expect([result]).toMatchInlineSnapshot(`
        [
          "export type FooSimple = { a?: 'A' | undefined; b?: 'B' | undefined; nested?: { c?: 'C' | undefined; d?: 'D' | undefined; e?: 'E'[] | undefined; } | undefined; array?: { c?: 'C' | undefined; d?: 'D' | undefined; e?: 'E'[] | undefined; }[] | undefined; };",
        ]
      `);
    });
  });
});
