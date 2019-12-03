import * as path from "path";
import * as fs from "fs-extra";
import { NcCate, NcCates, NcCode, NcCodeBox } from "../interfaces/examples";
import { parseMdDoc } from ".";
import * as _ from "lodash";
import { NcPage } from "../interfaces/page";

/**
 * 示例分类处理
 *
 * @export
 * @param {NcCates} cates
 */
export function hanlderCates(cates: NcCates, page: NcPage) {
  let folder = fs.readdirSync(cates.folderPath, "utf8");
  let mod = page.templates.find(x => x.type == "default" && x.name == "module");
  cates.list = [];
  folder.forEach(x => {
    let catePath = path.join(cates.folderPath, x);
    if (fs.lstatSync(catePath).isDirectory()) {
      let readme = parseMdDoc(path.join(catePath, "readme.md"));
      if (readme) {
        let cate: NcCate = {
          name: x,
          order: readme.meta.order,
          label: readme.meta.label,
          path: catePath
        };
        handlerCodeBoxes(cate, readme);
        if (cate.className) {
          mod.syswords.declarations += `, ${cate.className}`;
          mod.syswords.imports += `import { ${cate.className} } from "${cate.rootPath}";\n`;
        }
        cates.list.push(cate);
        cates.list = _.sortBy(cates.list, "order");
      }
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
      console.log(path.join(cate.path, x));
      let code: NcCode = {
        name: x,
        type: x.slice(x.lastIndexOf(".") + 1, x.length),
        content: fs.readFileSync(path.join(cate.path, x), "utf8")
      };
      if (code.type === "ts") {
        code.content = code.content.replace(/\`/g, "\\`");
        cate.selector = code.content.match(/selector: \"(\S*)\",/)[1];
        cate.className = code.content.match(/export class (\S*) /)[1];
        cate.rootPath = `./${cate.path
          .slice(cate.path.lastIndexOf("examples"), cate.path.length)
          .replace(/\\/g, "/")}/${x.slice(0, x.lastIndexOf(code.type) - 1)}`;
      }
      box.codes.push(code);
    }
  });
  cate.codeBoxes = box;
}
