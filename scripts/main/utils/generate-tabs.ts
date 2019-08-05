import * as fs from "fs-extra";
import { NcTabs } from "../interfaces/tabs";
import { replaceKey } from ".";

export function generateTabs(tabs: NcTabs) {
  let tpl = fs.readFileSync(tabs.tplPath, "utf8");
  let content = "";
  tabs.tabs.forEach(x => {
    content += `<nm-tab [nmLabel]="'${x.label}'">${x.content}</nm-tab>\n`;
  });
  console.log(content);
  replaceKey(tpl, "__layout", tabs.layout);
  replaceKey(tpl, "__content", content);
  tabs.content = tpl;

  return tabs;
}
