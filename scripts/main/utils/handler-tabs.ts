import * as path from "path";
import * as fs from "fs-extra";
import { NcTabs, NcTab } from "../interfaces/tabs";
import { parseMdDoc } from ".";
import * as _ from "lodash";

const tplDir = path.resolve(__dirname, "../../main/templates");

/**
 * 标签页处理
 * 读取文件夹的子文件夹作为单个标签页，从子文件中的 readme.md 中读取各自属性
 *
 * @export
 * @param {NcTabs} tabs
 * @returns
 */
export function handlerTabs(tabs: NcTabs) {
  tabs.tplPath = path.join(tplDir, "tabs-component.template.html");
  let folder = fs.readdirSync(tabs.folderPath, "utf8");
  tabs.tabs = [];
  folder.forEach(x => {
    let folder = path.join(tabs.folderPath, x);
    if (fs.lstatSync(folder).isDirectory()) {
      let readme = parseMdDoc(path.join(folder, "readme.md"));
      if (readme) {
        let tab: NcTab = {
          name: x,
          label: readme.meta.label,
          order: readme.meta.order,
          content: readme.content
        };
        tabs.tabs.push(tab);
      }
    }
  });
  tabs.tabs = _.sortBy(tabs.tabs, "order");

  return tabs;
}

/**
 * 标签页处理
 * 读取文件夹的子文件为单个标签页，从文件中的 readme.md 中读取各自属性
 *
 * @export
 * @param {NcTabs} tabs
 * @returns
 */
export function handlerTabsByFiles(tabs: NcTabs) {
  tabs.tplPath = path.join(tplDir, "tabs-component.template.html");
  let folder = fs.readdirSync(tabs.folderPath, "utf8");
  tabs.tabs = [];
  folder.forEach(x => {
    if (x != "readme.md") {
      let file = fs.readFileSync(path.join(tabs.folderPath, x), "utf8");
      let tab: NcTab = {
        name: x,
        label: x,
        order: x,
        content: file
      };
      tabs.tabs.push(tab);
    }
  });
  tabs.tabs = _.sortBy(tabs.tabs, "order");

  return tabs;
}
