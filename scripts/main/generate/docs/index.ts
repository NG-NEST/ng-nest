import { NcPage } from "../../interfaces/page";
import { NcMenu } from "../../interfaces/menu";
import {
  handlerPage,
  createRouterOutlet,
  pageAddChildren,
  generatePage,
  parseMdDoc,
  generateMenu
} from "../../utils";
import * as path from "path";
import * as fs from "fs-extra";

export const docsDir = path.resolve(__dirname, "../../../../docs");
export const genDir = path.resolve(__dirname, "../../../../src/main/docs");
export const genMenusDir = path.resolve(
  __dirname,
  "../../../../src/environments"
);
export const docsPrefix = "docs";

export class NcDocs {
  page: NcPage;
  genDir: string = genDir;
  menus: NcMenu[] = [];
  constructor() {
    this.genPages();
  }
  genPages() {
    this.page = createRouterOutlet(docsPrefix);
    handlerPage(this.page, genDir);
    this.addChildren(this.page, genDir, docsDir, `./${docsPrefix}`);
    generatePage(this.page);
    generateMenu(genMenusDir, this.menus);
  }
  addChildren(
    page: NcPage,
    genDir: string,
    docDir: string,
    router: string,
    index?: string
  ) {
    let children = fs.readdirSync(docDir);
    children.forEach((x, i) => {
      const dir = path.join(docDir, x);
      const stat = fs.statSync(dir);
      if (stat.isDirectory()) {
        const read = parseMdDoc(path.join(dir, "readme.md"));
        let child: NcPage;
        child =
          read.meta.type == "router"
            ? createRouterOutlet(x)
            : new NcPage({
                name: x,
                prefix: docsPrefix,
                type: "custom",
                custom: read.content
              });
        const folder = path.join(genDir, x);
        handlerPage(child, folder);
        page.children = [...page.children, child];
        const id = index == null ? `${i}` : `${index}-${i}`;
        const parentId = index == null ? null : `${index}`;
        this.menus = [
          ...this.menus,
          Object.assign(
            {
              id: id,
              parentId: parentId,
              name: x,
              router: `${router}/${x}`
            },
            read.meta
          )
        ];
        this.addChildren(child, folder, dir, `${router}/${x}`, id);
        generatePage(child);
      }
    });
    pageAddChildren(page, page.children);
  }
}
global["NcDocs"] = new NcDocs();
