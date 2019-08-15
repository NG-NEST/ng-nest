import { NcTabsLayoutEnum } from "./../interfaces/tabs";
import * as path from "path";
import * as fs from "fs-extra";
import { NcPage } from "../interfaces/page";
import { NcExamples, NcCates } from "../interfaces/examples";
import {
  replaceKey,
  randomString,
  generateTabs,
  handlerTabs,
  hanlderCates,
  generateCates,
  generateTabsActivatedChange
} from ".";
import * as _ from "lodash";

const tplDir = path.resolve(__dirname, "../../main/templates");

/**
 * 组件处理
 *
 * @export
 * @param {NcPage} page
 */
export function handlerComponent(page: NcPage) {
  handlerExamples(page);
  handlerApi(page);
  handlerStyle(page);
}

/**
 * 示例内容处理
 *
 * @export
 * @param {NcPage} page
 */
export function handlerExamples(page: NcPage) {
  if (page.custom.indexOf("__examples") <= -1) return;
  let examples: NcExamples = {};
  let comTpl = _.find(page.templates, x => x.name == "component");
  examples.path = path.join(page.path, "examples");
  examples.tplPath = path.join(tplDir, "examples-component.template.html");
  let func = "";
  while (func == "" || _.hasIn(comTpl.syswords.constant, func))
    func = randomString();
  comTpl.syswords.constant += `${generateTabsActivatedChange(func)}\n`;
  let tabs = handlerTabs({
    layout: NcTabsLayoutEnum.Left,
    folderPath: examples.path,
    activatedChange: `(nmActivatedChange)="${func}Change($event)"`
  });
  tabs.tabs.forEach(x => {
    let cates: NcCates = { folderPath: path.join(tabs.folderPath, x.name) };
    hanlderCates(cates);
    generateCates(cates, comTpl, func);
    if (cates.content) {
      x.content = cates.content;
    }
  });
  generateTabs(tabs);
  let examplesTpl = fs.readFileSync(examples.tplPath, "utf8");
  page.custom = replaceKey(
    page.custom,
    "__examples",
    replaceKey(examplesTpl, "__tabs", tabs.content)
  );
}

export function handlerApi(page: NcPage) {
  if (page.custom.indexOf("__api") <= -1) return;
  let comTpl = _.find(page.templates, x => x.name == "component");
  let api = "";
  while (api == "" || _.hasIn(comTpl.syswords.constant, api))
    api = randomString();
  let typeFile = fs.readFileSync(
    path.join(page.path, `nm-${page.name}.type.ts`),
    "utf8"
  );
  comTpl.syswords.constant += `${api}=\`${typeFile}\`;\n`;
  let highlightTpl = fs.readFileSync(
    path.join(tplDir, "highlight-component.template.html"),
    "utf8"
  );
  highlightTpl = replaceKey(highlightTpl, "__type", "typescript");
  highlightTpl = replaceKey(highlightTpl, "__data", api);
  page.custom = replaceKey(
    page.custom,
    "__api",
    `<nm-api>${highlightTpl}</nm-api>`
  );
}

export function handlerStyle(page: NcPage) {
  if (page.custom.indexOf("__style") <= -1) return;
  let comTpl = _.find(page.templates, x => x.name == "component");
  let style = "";
  while (style == "" || _.hasIn(comTpl.syswords.constant, style))
    style = randomString();
  let styleFile = fs.readFileSync(
    path.join(page.path, "style", `_param.scss`),
    "utf8"
  );
  comTpl.syswords.constant += `${style}=\`${styleFile}\`;\n`;
  let highlightTpl = fs.readFileSync(
    path.join(tplDir, "highlight-component.template.html"),
    "utf8"
  );
  highlightTpl = replaceKey(highlightTpl, "__type", "scss");
  highlightTpl = replaceKey(highlightTpl, "__data", style);
  page.custom = replaceKey(
    page.custom,
    "__style",
    `<nm-style>${highlightTpl}</nm-style>`
  );
}
