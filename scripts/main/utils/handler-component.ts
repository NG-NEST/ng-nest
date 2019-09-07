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
  generateTabsActivatedChange,
  hanlderType,
  generateTypes,
  hanlderStyle,
  generateStyles
} from ".";
import * as _ from "lodash";

const tplDir = path.resolve(__dirname, "../../main/templates");

/**
 * 组件处理
 *
 * @export
 * @param {NcPage} page
 */
export async function handlerComponent(page: NcPage) {
  handlerExamples(page);
  await handlerApi(page);
  await handlerStyle(page);
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
    hanlderCates(cates, page);
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
  page.copyDir.push({
    from: examples.path,
    to: path.join(page.genDir, "examples"),
    exclude: [".md"]
  });
}

export async function handlerApi(page: NcPage) {
  if (page.custom.indexOf("__api") <= -1) return;
  let types = await hanlderType(
    path.join(page.path, `nm-${page.name}.type.ts`)
  );
  page.custom = replaceKey(
    page.custom,
    "__api",
    `<nm-api>${generateTypes(...types)}</nm-api>`
  );
}

export async function handlerStyle(page: NcPage) {
  if (page.custom.indexOf("__style") <= -1) return;
  let styles = await hanlderStyle(path.join(page.path, "style", `_param.scss`));
  page.custom = replaceKey(
    page.custom,
    "__style",
    `<nm-style>${generateStyles(...styles)}</nm-style>`
  );
}
