import * as md from "marked";
import * as yfm from "yaml-front-matter";
import * as fs from "fs-extra";

export function parseMdDoc(path: string) {
  let lstat = fs.existsSync(path);
  if (!lstat) return false;
  const file = fs.readFileSync(path, "utf8");
  const meta = yfm.loadFront(file);
  const content = meta.__content;
  delete meta.__content;

  const remark = require("remark")();
  const ast = remark.parse(content);
  let contentStr = "";

  for (let i = 0; i < ast.children.length; i++) {
    const child = ast.children[i];
    contentStr += md(remark.stringify(child));
  }
  return {
    meta: meta,
    content: contentStr
  };
}
