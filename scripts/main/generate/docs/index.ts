import { NcPage } from "../../interfaces/page";
import {
  handlerPage,
  createRouterOutlet,
  pageAddChildren,
  generatePage
} from "../../utils";
import * as path from "path";
import { menus } from "./menus";
import { isNullOrUndefined } from "util";

export const genDir = path.resolve(__dirname, "../../../../src/main/docs-gen");

export const docsPrefix = "docs";

export const ncMenus = menus;

export const ncChildrenMenus = menus.filter(x => x.parentId == null);

export class NcDocs {
  page: NcPage;
  genDir: string = genDir;
  constructor() {
    this.genComponent();
  }
  genComponent() {
    this.page = createRouterOutlet(docsPrefix);
    handlerPage(this.page, genDir);
    this.addChildren(this.page, genDir);
    generatePage(this.page);
  }
  addChildren(page: NcPage, dir: string, parentId = null) {
    let children = menus.filter(x => x.parentId === parentId);
    children.forEach(x => {
      let child: NcPage;
      child = isNullOrUndefined(x.router)
        ? createRouterOutlet(x.name)
        : new NcPage({ name: x.name, prefix: `${docsPrefix}` });
      let folder = path.join(dir, x.name);
      handlerPage(child, folder);
      page.children = [...page.children, child];
      this.addChildren(child, folder, x.id);
      generatePage(child);
    });
    pageAddChildren(page, page.children);
  }
  createPage() {

  }
}
global["NcDocs"] = new NcDocs();
