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
  if (page.custom.indexOf("__examples") > -1) {
    handlerExamples(page);
  }
}

/**
 * 示例内容处理
 *
 * @export
 * @param {NcPage} page
 */
export function handlerExamples(page: NcPage) {
  let examples: NcExamples = {};
  let comTpl = _.find(page.templates, x => x.name == "component");
  examples.path = path.join(page.path, "examples");
  examples.tplPath = path.join(tplDir, "examples-component.template.html");
  let func = "";
  while (func == "" || _.hasIn(comTpl.syswords.constant, func)) func = randomString();
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
