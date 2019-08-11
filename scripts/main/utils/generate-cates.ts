import * as fs from "fs-extra";
import * as path from "path";
import { NcCates } from "../interfaces/examples";
import { handlerTabs, handlerTabsByFiles, randomString } from ".";
import { NcTabsLayoutEnum, NcTab } from "../interfaces/tabs";
import { generateTabs } from ".";
import { NcPage } from "../interfaces/page";
import * as _ from "lodash";
import { replaceKey } from "./replace-key";

const tplDir = path.resolve(__dirname, "../../main/templates");

/**
 * 生成示例分类
 *
 * @export
 * @param {NcCates} cates
 * @returns
 */
export function generateCates(cates: NcCates, page: NcPage): NcCates {
  if (cates.list.length > 0) {
    let catesTabs = handlerTabs({ layout: NcTabsLayoutEnum.Top, folderPath: cates.folderPath });
    catesTabs.tabs.forEach(x => {
      generateFiles(x, page, path.join(cates.folderPath, x.name));
    });
    cates.content = generateTabs(catesTabs).content;
  }
  return cates;
}

/**
 * 生成分类文件中的代码
 *
 * @export
 * @param {NcTab} tab
 */
export function generateFiles(tab: NcTab, page: NcPage, folderPath: string) {
  let comTpl = _.find(page.templates, x => x.name == "component");
  let highlightTpl = fs.readFileSync(
    path.join(tplDir, "highlight-component.template.html"),
    "utf8"
  );
  if (!comTpl) return;
  let childTabs = handlerTabsByFiles({
    layout: NcTabsLayoutEnum.Top,
    folderPath: folderPath
  });
  let html = "";
  childTabs.tabs.forEach((x, index) => {
    let param = "";
    while (param == "" || _.hasIn(comTpl.syswords.constant, param)) param = randomString();
    let tpl = highlightTpl;
    let content =
      x.content.lastIndexOf("\n") == x.content.length - 1
        ? x.content.slice(0, x.content.length - 1)
        : x.content;
    comTpl.syswords.constant += `${param}=\`${content}\`;\n  `;
    tpl = replaceKey(
      tpl,
      "__type",
      extToType[x.name.slice(x.name.lastIndexOf(".") + 1, x.name.length)]
    );
    tpl = replaceKey(tpl, "__data", param);
    if (x.name == `${tab.name}.component.html`) html = content;
    x.content = tpl;
  });
  tab.content = `
  <div class="nm-examples-html">${html}</div>\n
  <div class="nm-examples-code">${generateTabs(childTabs).content}</div>\n
  <div class="nm-examples-info">${tab.content}</div>\n
  `;

  return tab;
}

/**
 * 文件后缀对应的文件类型
 */
export const extToType = {
  ts: "typescript",
  html: "html",
  scss: "scss",
  css: "css"
};
