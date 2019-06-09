import * as path from "path";
import * as fs from "fs-extra";
import { NcPage } from "../interfaces/page";
import { replaceKey } from "./generate-page";

const tplDir = path.resolve(__dirname, "../../main/templates");

export function handlerComponent(page: NcPage) {
  createExamples(page);
}

export function createExamples(page: NcPage) {
  let temp = fs.readFileSync(path.join(tplDir, "examples-component.template.html"), "utf8")
  page.custom = replaceKey(page.custom, "__examples", temp);
  console.log(page.custom);
}