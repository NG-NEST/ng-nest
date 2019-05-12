import * as fs from "fs-extra";
import * as path from "path";
import { isObject, isString } from "util";
import { NcTplName, NcTemplate } from "../interfaces/template";
import { NcPage } from "../interfaces/page";

const tplDir = path.resolve(__dirname, "../../main/templates");

export function handlerPage(page: NcPage, dir: string) {
  // let componentTpl = fs.readFileSync(`${tplDir}/component.template.ts`, "utf8");
  // let moduleTpl = fs.readFileSync(`${tplDir}/module.template.ts`, "utf8");
  // let routesTpl = fs.readFileSync(`${tplDir}/routes.template.ts`, "utf8");
  let templates: NcTplName[] = ["component", "module", "routes-module"];
  if (page.outlet) {
    templates.unshift({ name: "component", extension: "html" });
  }
  handleTemplates(page, tplDir, dir, ...templates);
  // fs.writeFileSync(
  //   path.join(dir, `${page.fileName}.component.html`),
  //   page.html.template,
  //   "utf8"
  // );
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
    // tpl.content = replaceKey(
    //   page,
    //   fs.readFileSync(
    //     path.join(fromDir, `${tpl.name}.template.${tpl.extension}`),
    //     "utf8"
    //   )
    // )[0];
    // fs.writeFileSync(path.join(toDir, `${tpl.genName}`), tpl.content, "utf8");
    tpls.push(tpl);
  });
  page.templates = [...page.templates, ...tpls];
  return tpls;
}

export function replaceKey(
  page: NcPage | any,
  ...templates: string[]
): string[] {
  for (let key in page) {
    templates = templates.map(x => {
      x = x.replace(new RegExp(`{{ ${key} }}`, "g"), page[key]);
      if (isObject(page[key])) x = replaceKey(page[key], x)[0];
      return x;
    });
  }
  return templates;
}
