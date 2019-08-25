import * as path from "path";
import * as fs from "fs-extra";
import { NcCate, NcCates, NcCode, NcCodeBox } from "../interfaces/examples";
import { parseMdDoc } from ".";
import * as _ from "lodash";

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
      handlerCodeBoxes(cate, readme);
      cates.list.push(cate);
      cates.list = _.sortBy(cates.list, "order");
    }
  });
}

/**
 * 分类中的代码处理
 *
 * @export
 * @param {NcCate} cate
 * @param {*} readme
 */
export function handlerCodeBoxes(cate: NcCate, readme) {
  let folder = fs.readdirSync(cate.path, "utf8");
  let box: NcCodeBox = {
    codes: [],
    description: readme.content
  };
  folder.forEach(x => {
    if (x !== "readme.md") {
      let code: NcCode = {
        name: x,
        type: x.slice(x.lastIndexOf(".") + 1, x.length),
        content: fs.readFileSync(path.join(cate.path, x), "utf8")
      };
      if (code.type === "ts") {
        code.content = code.content.replace(/\`/g, "\\`");
      }
      box.codes.push(code);
    }
  });
  cate.codeBoxes = box;
}
