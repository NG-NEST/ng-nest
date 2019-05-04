import * as fs from "fs-extra";
import * as md from "marked";

export function mdToHtml(mdPath) {
  if (!fs.existsSync(mdPath)) return;
  return md(fs.readFileSync(mdPath, "utf8"));
}
