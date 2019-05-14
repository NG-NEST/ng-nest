import * as fs from "fs-extra";
import * as path from "path";
import { NcPage } from "../interfaces/page";
import { checkMkdir } from "./check-mkdir";
import { isObject } from "util";

export function generatePage(page: NcPage) {
  page.templates.forEach(x => {
    x.content = replaceKeyByPage(
      page,
      "__",
      fs.readFileSync(x.tplPath, "utf8")
    );
    x.content = replaceKeyByObject(x.content, x.syswords, "__");
    x.content = replaceKeyByObject(x.content, x.keywords);
    checkMkdir(x.genPath.replace(x.genName, ""));
    fs.writeFileSync(x.genPath, x.content, "utf8");
  });
}

export function replaceKeyByPage(
  page: NcPage | any,
  prefix: string,
  template: string
): string {
  for (let key in page) {
    template = replaceKey(template, `${prefix}${key}`, page[key]);
  }
  return template;
}

export function replaceKeyByObject(
  content: string,
  object: any,
  prefix: string = ""
) {
  if (!isObject(object)) {
    return content;
  }
  for (let key in object) {
    content = replaceKey(content, `${prefix}${key}`, object[key]);
  }
  return content;
}

export function replaceKey(content: string, key: string, value: string) {
  return content.replace(new RegExp(`{{ ${key} }}`, "g"), value);
}
