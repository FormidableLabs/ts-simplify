import { describe, expect, it } from "vitest";
import { simplifyTypes } from "./simplify-types";

describe("simplify-types", () => {
  describe("./src/fixtures/test-file.ts", () => {
    it("renders the entire compiled file correctly", async () => {
      const result = simplifyTypes({ sourceFile: "./src/fixtures/test-file.ts" });
      expect(result).toMatchInlineSnapshot(`
        "/* Types generated from './src/fixtures/test-file.ts' */
          

        export type Foo = { a: 'A'; b?: 'B' | undefined; nested: { c: 'C'; d?: 'D' | undefined; e: 'E'[]; }; array: { c: 'C'; d?: 'D' | undefined; e: 'E'[]; }[]; };
        export type FooPartial = { a?: 'A' | undefined; b?: 'B' | undefined; nested?: { c: 'C'; d?: 'D' | undefined; e: 'E'[]; } | undefined; array?: { c: 'C'; d?: 'D' | undefined; e: 'E'[]; }[] | undefined; };
        export type FooRequired = { a: 'A'; b: 'B'; nested: { c: 'C'; d?: 'D' | undefined; e: 'E'[]; }; array: { c: 'C'; d?: 'D' | undefined; e: 'E'[]; }[]; };
        export type FooPartialDeep = { a?: 'A' | undefined; b?: 'B' | undefined; nested?: { c?: 'C' | undefined; d?: 'D' | undefined; e?: 'E'[] | undefined; } | undefined; array?: { c?: 'C' | undefined; d?: 'D' | undefined; e?: 'E'[] | undefined; }[] | undefined; };
        export type FooRequiredDeep = { a: 'A'; b: 'B'; nested: { c: 'C'; d: 'D'; e: 'E'[]; }; array: { c: 'C'; d: 'D'; e: 'E'[]; }[]; };"
      `);
    });
  });
  describe("./src/fixtures/external-types.ts", () => {
    it("renders the entire compiled file correctly", async () => {
      const result = simplifyTypes({ sourceFile: "./src/fixtures/external-types.ts" });
      expect(result).toMatchInlineSnapshot(`
        "/* Types generated from './src/fixtures/external-types.ts' */
          

        export type HTMLAttrs = { className: string; readonly clientWidth: number; textContent: string | null; autofocus: boolean; };"
      `);
    });
  });
});
