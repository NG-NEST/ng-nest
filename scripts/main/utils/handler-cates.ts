import * as path from "path";
import * as fs from "fs-extra";
import { NcCate, NcCates } from "../interfaces/examples";

const tplDir = path.resolve(__dirname, "../../main/templates");

export function hanlderCates(cates: NcCates) {
  let folder = fs.readdirSync(cates.folderPath, "utf8");
  folder.forEach(x => {
    let catePath = path.join(cates.folderPath, x);
    if (fs.lstatSync(catePath).isDirectory()) {

    }
  });
}

export function handlerCodeBoxes(cate: NcCate) {
  // let html = fs.readFileSync(path.join(cate.path, `${cate.name}.html`), "utf-8");
  // let readme = parseMdDoc(path.join(cate.path, "readme.md"));
  // let box: NcCodeBox = {
  //   demo: html,
  //   code: html,
  //   description: readme.content
  // };
  // cate.order = readme.meta.order;
  // cate.label = readme.meta.label;
  // cate.codeBoxes.push(box);
}
