#!/usr/bin/env node

import fs from "node:fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { simplifyTypes } from "../simplify-types";

const description = "Compiles TypeScript types into simple, alias-free primitives";

yargs(hideBin(process.argv))
  .scriptName("ts-simplify")
  .usage(`$0 <source> [output] -- ${description}`)
  .command(
    ["*", "simplify"],
    description,
    (yargs) =>
      yargs
        .positional("source", {
          description:
            "A TypeScript file that exports types.  The output will contain compiled versions of these exports.",
          type: "string",
          demandOption: true,
          // defaultValue: "",
        })
        .positional("output", {
          description: "A .d.ts file for outputting the compiled types.  If omitted, the file will be sent to stdout.",
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
        .check(({ overwrite, _: [source, output] }) => {
          // Check for source:
          if (!source) {
            throw new Error(`'source' is required`);
          }

          // Check if output exists:
          if (output && !overwrite && fs.existsSync(output)) {
            throw new Error(`File '${output}' already exists.  Use --overwrite (-f) to overwrite it.`);
          }

          return true; // tell Yargs that the arguments passed the check
        }),
    ({ _: [source, output] }) => {
      // Generate the simplified types:
      const outputText = simplifyTypes({ sourceFile: source });
      // Output the results:
      if (output) {
        fs.writeFileSync(output, outputText);
        console.log(`Output types to '${output}'`);
      } else {
        console.log(outputText);
      }
    }
  )
  .help()
  .parseSync();
