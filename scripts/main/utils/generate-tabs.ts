import * as fs from "fs-extra";
import { NcTabs } from "../interfaces/tabs";
import { replaceKey } from ".";
import * as _ from "lodash";

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
  tpl = replaceKey(tpl, "__id", tabs.id ? `#${tabs.id}` : "");
  tpl = replaceKey(tpl, "__activatedChange", tabs.activatedChange ? tabs.activatedChange : "");
  tabs.content = tpl;

  return tabs;
}

export function generateTabsActivatedChange(func: string) {
  if (_.isEmpty(func)) return;
  return `@ViewChildren("${func}")
  private _list${func}Tabs: Array<any>;
  get list${func}Tabs(): Array<any> {
    return this._list${func}Tabs;
  }
  set list${func}Tabs(value: Array<any>) {
    this._list${func}Tabs = value;
  }
  ${func}Change($event: any) {
    let subTabs = this.list${func}Tabs.find((x, i) => i == $event.nmActivatedIndex);
    if (subTabs) {
      subTabs.slider.setHighlight();
    }
  }`;
}
