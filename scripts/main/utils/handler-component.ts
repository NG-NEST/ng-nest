import { NcTabsLayoutEnum } from "./../interfaces/tabs";
import * as path from "path";
import * as fs from "fs-extra";
import { NcPage } from "../interfaces/page";
import { NcExamples, NcCates } from "../interfaces/examples";
import { handlerTabs } from "./handler-tabs";
import { hanlderCates } from "./handler-cates";
import { generateCates } from "./generate-cates";
import { replaceKey } from ".";
import { generateTabs } from "./generate-tabs";

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
  examples.path = path.join(page.path, "examples");
  examples.tplPath = path.join(tplDir, "examples-component.template.html");
  let tabs = handlerTabs({ layout: NcTabsLayoutEnum.Left, folderPath: examples.path });
  tabs.tabs.forEach(x => {
    let cates: NcCates = { folderPath: path.join(tabs.folderPath, x.name) };
    hanlderCates(cates);
    generateCates(cates, page);
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
