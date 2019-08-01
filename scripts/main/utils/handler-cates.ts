import * as path from "path";
import * as fs from "fs-extra";
import { NcCate, NcCates, NcCodeType, NcCode, NcCodeBox } from "../interfaces/examples";
import { parseMdDoc } from ".";
import _ = require("lodash");

const tplDir = path.resolve(__dirname, "../../main/templates");

/**
 * 示例分类处理
 *
 * @export
 * @param {NcCates} cates
 */
export function hanlderCates(cates: NcCates) {
  let folder = fs.readdirSync(cates.folderPath, "utf8");
  cates.list = [];
  folder.forEach(x => {
    let catePath = path.join(cates.folderPath, x);
    if (fs.lstatSync(catePath).isDirectory()) {
      let readme = parseMdDoc(path.join(catePath, "readme.md"));
      let cate: NcCate = {
        name: x,
        order: readme.meta.order,
        label: readme.meta.label,
        path: catePath
      };
      handlerCodeBoxes(cate, readme)
      cates.list.push(cate);
      cates.list = _.sortBy(cates.list, "order");
    }
  });

  // console.log(cates);
}

export function handlerCodeBoxes(cate: NcCate, readme) {
  let html = fs.readFileSync(path.join(cate.path, `${cate.name}.component.html`), "utf-8");
  let box: NcCodeBox = {
    demo: html,
    codes: [],
    description: readme.content
  };
}
