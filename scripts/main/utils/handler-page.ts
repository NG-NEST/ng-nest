import * as fs from "fs-extra";
import * as path from "path";
import { isObject, isString } from "util";
import { NcTplName, NcTemplate } from "../interfaces/template";
import { NcPage } from "../interfaces/page";
import { checkMkdir } from "./check-mkdir";

const tplDir = path.resolve(__dirname, "../../main/templates");

export function handlerPage(page: NcPage, dir: string) {
  let templates: NcTplName[] = ["component", "module", "routes-module"];
  if (page.outlet) {
    templates.unshift({ name: "component", extension: "html" });
  }
  handleTemplates(page, tplDir, dir, ...templates);
}

export function handleTemplates(
  page: NcPage,
  fromDir: string,
  toDir: string,
  ...name: NcTplName[]
): NcTemplate[] {
  let tpls: NcTemplate[] = [];
  name.forEach(x => {
    let tpl: NcTemplate;
    if (isString(x)) {
      tpl = new NcTemplate({ fileName: page.fileName, name: x });
    } else {
      x.fileName = page.fileName;
      tpl = new NcTemplate(x);
    }
    tpl.tplPath = path.join(fromDir, `${tpl.name}.template.${tpl.extension}`);
    tpl.genPath = path.join(toDir, `${tpl.genName}`);
    // tpl.content = replaceKeyByPage(
    //   page,
    //   "__",
    //   fs.readFileSync(tpl.tplPath, "utf8")
    // )[0];
    // tpl.content = replaceKeyByObject(tpl.content, tpl.syswords, "__");
    // checkMkdir(toDir);
    // fs.writeFileSync(tpl.genPath, tpl.content, "utf8");
    tpls.push(tpl);
  });
  page.templates = [...page.templates, ...tpls];
  return tpls;
}

export function replaceKeyByPage(
  page: NcPage | any,
  prefix: string,
  ...templates: string[]
): string[] {
  for (let key in page) {
    templates = templates.map(x => {
      x = replaceKey(x, `${prefix}${key}`, page[key]);
      return x;
    });
  }
  return templates;
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

export function createRouterOutlet(name: string) {
  return new NcPage({
    prefix: name,
    name: name,
    fileName: name,
    outlet: true
  });
}
