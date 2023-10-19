#!/usr/bin/env node

import fs from "node:fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { simplifyTypes } from "../simplify-types";

const config = (() => {
  const result = yargs(hideBin(process.argv))
    .scriptName("ts-simplify")
    .usage("$0 <source.ts> [output.d.ts]")
    .option("source", {
      description: "A TypeScript file that exports types.  The output will contain compiled versions of these exports.",
      alias: "s",
      type: "string",
    })
    .option("output", {
      description: "A .d.ts file for outputting the compiled types.  If omitted, the file will be sent to stdout.",
      alias: "o",
      type: "string",
      defaultValue: "",
    })
    .option("overwrite", {
      description: "Overwrite the existing output file",
      alias: "f",
      type: "boolean",
      defaultValue: false,
    })
    .string("_")
    .check((argv) => {
      // Ensure we have a source:
      if (!(argv.source || argv._[0])) {
        throw new Error("Missing 'source' parameter ");
      }

      // Check if output exists:
      if (argv.output && !argv.overwrite && fs.existsSync(argv.output)) {
        throw new Error(`File '${argv.output}' already exists.  Use --overwrite (-f) to overwrite it.`);
      }

      return true; // tell Yargs that the arguments passed the check
    })
    .help();

  type Unwrap<T> = T extends Promise<infer Value> ? Value : T;
  const argv = result.argv as Unwrap<typeof result.argv>;

  return {
    outputFile: argv.output || argv._[1],
    sourceFile: argv.source || argv._[0],
  };
})();

// Generate the simplified types:
const outputText = simplifyTypes({ sourceFile: config.sourceFile });
// Output the results:
if (config.outputFile) {
  fs.writeFileSync(config.outputFile, outputText);
  console.log(`Output types to '${config.outputFile}'`);
} else {
  console.log(outputText);
}
