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
import * as _ from "lodash";

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
    this.menus = _.sortBy(this.menus, ["parentId", "order"]);
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
        const folder = path.join(genDir, x);
        const child = this.createChild(read, x, folder);
        page.children = [...page.children, child];
        const thisRouter = `${router}/${x}`;
        const menu = this.createMenu(read, x, index, i, thisRouter);
        this.addChildren(child, folder, dir, menu.router, menu.id);
        generatePage(child);
      }
    });
    page.children = _.sortBy(page.children, x => x.order);
    pageAddChildren(page, page.children);
  }

  createChild(
    read: { meta: any; content: any },
    dirName: string,
    folder: string
  ) {
    let child =
      read.meta.type == "router"
        ? createRouterOutlet(dirName)
        : new NcPage({
            name: dirName,
            prefix: docsPrefix,
            type: "custom",
            custom: read.content
          });
    child.order = read.meta.order;
    handlerPage(child, folder);
    return child;
  }

  createMenu(
    read: { meta: any; content?: string },
    dirName: string,
    index: string,
    i: number,
    router: string
  ): NcMenu {
    const id = index == null ? `${i}` : `${index}-${i}`;
    const parentId = index == null ? null : `${index}`;
    const menu: NcMenu = Object.assign(
      {
        id: id,
        parentId: parentId,
        name: dirName,
        router: router
      },
      read.meta
    );
    this.menus = [...this.menus, menu];
    return menu;
  }
}
global["NcDocs"] = new NcDocs();
