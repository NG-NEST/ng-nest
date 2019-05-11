import { NcPage } from "../interfaces";
import * as fs from "fs-extra";
import * as path from "path";
import { isObject } from "util";

const tplDir = path.resolve(__dirname, "../../main/templates");

export function generatePage(page: NcPage, dir: string) {
  let htmlTpl = page.component.htmlTpl;
  let componentTpl = fs.readFileSync(`${tplDir}/component.template.ts`, "utf8");
  let moduleTpl = fs.readFileSync(`${tplDir}/module.template.ts`, "utf8");
  let routesTpl = fs.readFileSync(`${tplDir}/routes.template.ts`, "utf8");
  const templates = replaceKey(
    page,
    htmlTpl,
    componentTpl,
    moduleTpl,
    routesTpl
  );
  fs.writeFileSync(
    path.join(dir, `${page.fileName}.component.html`),
    templates[0],
    "utf8"
  );
  fs.writeFileSync(
    path.join(dir, `${page.fileName}.component.ts`),
    templates[1],
    "utf8"
  );
  fs.writeFileSync(
    path.join(dir, `${page.fileName}.module.ts`),
    templates[2],
    "utf8"
  );
  fs.writeFileSync(
    path.join(dir, `${page.fileName}-routes.module.ts`),
    templates[3],
    "utf8"
  );
}

export function replaceKey(page: NcPage | any, ...templates: string[]) {
  for (let key in page) {
    templates = templates.map(x => {
      x = x.replace(new RegExp(`{{ ${key} }}`, "g"), page[key]);
      if (isObject(page[key])) x = replaceKey(page[key], x)[0];
      return x;
    });
  }
  return templates;
}
