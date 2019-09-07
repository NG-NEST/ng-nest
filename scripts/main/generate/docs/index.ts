import { NcPage } from "../../interfaces/page";
import { NcMenu } from "../../interfaces/menu";
import {
  handlerPage,
  createRouterOutlet,
  pageAddChildren,
  generatePage,
  parseMdDoc,
  generateMenu,
  handlerComponent,
  getThemes
} from "../../utils";
import * as path from "path";
import * as fs from "fs-extra";
import * as _ from "lodash";

export const docsDir = path.resolve(__dirname, "../../../../docs");
export const componentsDir = path.resolve(
  __dirname,
  "../../../../libraries/ng-moon/src/components"
);
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

  async genPages() {
    await getThemes();
    this.page = createRouterOutlet(docsPrefix);
    this.page.genDir = genDir;
    handlerPage(this.page);
    this.addChildren(this.page, docsDir, `./${docsPrefix}`);
    generatePage(this.page);
    this.menus = _.sortBy(this.menus, ["parentId", "order"]);
    generateMenu(genMenusDir, this.menus);
  }

  addChildren(
    page: NcPage,
    docDir: string,
    router: string,
    index?: string,
    level?: number
  ) {
    let children = fs.readdirSync(docDir);
    if (typeof level !== "undefined") level--;
    children.forEach(async (x, i) => {
      const dir = path.join(docDir, x);
      const stat = fs.statSync(dir);
      if (stat.isDirectory()) {
        const read = parseMdDoc(path.join(dir, "readme.md"));
        const folder = path.join(page.genDir, x);
        const child = this.createChild(read, x, folder);
        child.genDir = folder;
        child.path = dir;
        page.children = [...page.children, child];
        const thisRouter = `${router}/${x}`;
        const menu = this.createMenu(read, x, index, i, thisRouter);
        if (x === "components") {
          child.path = componentsDir;
          this.addChildren(child, componentsDir, menu.router, menu.id, 2);
        } else if (level !== 0) {
          this.addChildren(child, dir, menu.router, menu.id, level);
        }
        if (
          dir.indexOf(componentsDir) === 0 &&
          typeof read.meta.type === "undefined"
        ) {
          await handlerComponent(child);
        }
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
    child.genDir = folder;
    handlerPage(child);
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
      { id: id, parentId: parentId, name: dirName, router: router },
      read.meta
    );
    this.menus = [...this.menus, menu];
    return menu;
  }
}
global["NcDocs"] = new NcDocs();
