import { NcTabsLayoutEnum } from "./../interfaces/tabs";
import * as path from "path";
import * as fs from "fs-extra";
import { NcPage } from "../interfaces/page";
import { NcExamples, NcCates } from "../interfaces/examples";
import { handlerTabs } from "./handler-tabs";
import { hanlderCates } from "./handler-cates";
import { generateCates } from "./generate-cates";

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
  let tabs = handlerTabs({ layout: NcTabsLayoutEnum.Left, folderPath: examples.path });
  tabs.tabs.forEach(x => {
    // console.log(x);
    let cates: NcCates = { folderPath: path.join(tabs.folderPath, x.name) };
    hanlderCates(cates);
    x.content = generateCates(cates)
  });
  // console.log(tabs);
  // console.log(tabs);
  // console.log(page.custom)
  // console.log(page);
  // page.custom = replaceKey(page.custom, "__examples", replaceKey(temp, "__tabs", tabs));
}
