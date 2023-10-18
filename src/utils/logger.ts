import debug from "debug";

const base = debug("ts-simplify");
export const logger = {
  info: base.extend("info"),
  warn: base.extend("warn"),
  error: base.extend("error"),
};
