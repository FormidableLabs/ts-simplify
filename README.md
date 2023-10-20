# ts-simplify

CLI tool to compile TypeScript types into simple, alias-free primitives.

## Usage

```sh
ts-simplify <source> [output]
```

This can be run via `npx` without installation, eg: 
```sh
npx ts-simplify <source> [output]
```

## Example

If you have a TypeScript file with exported types:
```ts
// example-types.ts
type MyType = { a: "A", b: "B", nested: Nested };
type Nested = { c:"C" };
export type MyType = Omit<MyType, 'b'>;
```

Running this:
```sh
ts-simplify ./example-types.ts ./example-types.d.ts
```

will output this:

```ts
// example-types.d.ts
export type MyType = { a: "A", nested: { c: "C" } };
```
