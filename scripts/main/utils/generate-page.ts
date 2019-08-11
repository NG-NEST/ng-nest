import * as fs from "fs-extra";
import { NcPage } from "../interfaces/page";
import { checkMkdir } from "./check-mkdir";
import { replaceKeyByPage, replaceKeyByObject } from ".";

/**
 * 生成页面代码
 *
 * @export
 * @param {NcPage} page
 */
export function generatePage(page: NcPage) {
  page.templates.forEach(x => {
    x.content = replaceKeyByPage(
      page,
      "__",
      fs.readFileSync(x.tplPath, "utf8")
    );
    x.content = replaceKeyByObject(x.content, x.syswords, "__");
    x.content = replaceKeyByObject(x.content, x.keywords);
    checkMkdir(x.genPath.replace(x.genName, ""));
    fs.writeFileSync(x.genPath, x.content, "utf8");
  });
}
