import * as path from "path";
import * as fs from "fs-extra";
import { NcPage } from "../interfaces/page";
import { replaceKey } from "./generate-page";
import { NcExamples, NcCate } from "../interfaces/examples";

const tplDir = path.resolve(__dirname, "../../main/templates");

export function handlerComponent(page: NcPage) {
  if (page.custom.indexOf("__examples") > -1) {
    createExamples(page);
  }
}

export function createExamples(page: NcPage) {
  let examples: NcExamples = {};
  let temp = fs.readFileSync(path.join(tplDir, "examples-component.template.html"), "utf8");
  examples.path = path.join(page.path, "examples");
  createTabs(examples);
  page.custom = replaceKey(page.custom, "__examples", temp);
}

export function createTabs(examples: NcExamples) {
  let cates = fs.readdirSync(examples.path, "utf8");
  cates.forEach(x => {
    let cate: NcCate = {};
    cate.path = path.join(examples.path, x);

  });
}
