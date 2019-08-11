import * as fs from "fs-extra";
import { NcTabs } from "../interfaces/tabs";
import { replaceKey } from ".";

/**
 * 生成标签页组件代码
 *
 * @export
 * @param {NcTabs} tabs
 * @returns
 */
export function generateTabs(tabs: NcTabs): NcTabs {
  let tpl = fs.readFileSync(tabs.tplPath, "utf8");
  let content = "";
  tabs.tabs.forEach(x => {
    content += `<nm-tab [nmLabel]="'${x.label}'">${x.content}</nm-tab>\n`;
  });
  tpl = replaceKey(tpl, "__layout", tabs.layout);
  tpl = replaceKey(tpl, "__content", content);
  tabs.content = tpl;

  return tabs;
}
