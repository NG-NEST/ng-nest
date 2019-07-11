import * as path from "path";
import * as fs from "fs-extra";
import { NcExamples, NcCate, NcCodeBox } from "../interfaces/examples";
import { parseMdDoc } from "./parse-md-doc";

const tplDir = path.resolve(__dirname, "../../main/templates");

export function createTabs(examples: NcExamples) {
  let cates = fs.readdirSync(examples.path, "utf8");
  cates.forEach(x => {
    let cate: NcCate = {
      name: x,
      path: path.join(examples.path, x),
      codeBoxes: []
    };
    createCodeBoxes(cate);
  });
}

export function createCodeBoxes(cate: NcCate) {
  let html = fs.readFileSync(path.join(cate.path, `${cate.name}.html`), "utf-8");
  let readme = parseMdDoc(path.join(cate.path, "readme.md"));
  let box: NcCodeBox = {
    demo: html,
    code: html,
    description: readme.content
  };
  cate.order = readme.meta.order;
  cate.label = readme.meta.label;
  cate.codeBoxes.push(box);
}
