import { NcUi } from "./ui";
import { NcPage } from "../../interfaces/page";
import { handlerPage, createRouterOutlet, pageAddChildren, generatePage } from "../../utils";
import * as path from "path";
import { menus } from "./menus";

export const genDir = path.resolve(__dirname, "../../../../src/main/docs-gen");

export const docsPrefix = "docs";

export const ncMenus = menus;

export const ncRootMenus = menus.filter(x => x.parentId == null);

export class NcDocs {
  ui = new NcUi();
  page: NcPage;
  children: NcPage[] = [];
  constructor() {
    this.genComponent();
  }
  init() {
    this.ui.init();
  }
  genComponent() {
    this.page = createRouterOutlet(docsPrefix);
    handlerPage(this.page, genDir);
    this.addChildren();
    generatePage(this.page);
  }
  addChildren() {
    ncRootMenus.forEach(x => {
      let page = createRouterOutlet(x.name);
      handlerPage(page, path.join(genDir, x.name));
      this.children = [...this.children, page];
    });
    pageAddChildren(this.page, this.children);
  }
}
global["NcDocs"] = new NcDocs();
global["NcDocs"].init();
