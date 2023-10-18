import { beforeEach, describe, expect, test } from "vitest";
import { simplifyTypes } from "./simplify-types";

beforeEach(() => {
  //
});

describe("simplify-types", () => {
  test("it renders", async () => {
    const result = simplifyTypes({ sourceFile: "./src/tests/test-file.ts" });
    expect(result).toMatchInlineSnapshot(`
      "/* Types generated from './src/tests/test-file.ts' */
        

      export type Foo = { a: \\"A\\"; b?: \\"B\\" | undefined; nested: { c: \\"C\\"; d?: \\"D\\" | undefined; }; };
      export type FooSimple = { a: \\"A\\"; b?: \\"B\\" | undefined; nested: { c: \\"C\\"; d?: \\"D\\" | undefined; }; };"
    `);
  });
});
