import { menus } from "./../../../../src/environments/routes";
import { NcUi } from "./ui";
import { NcPage } from "../../interfaces/page";
import { handlerPage } from "../../utils";
import * as path from "path";

export const genDir = path.resolve(__dirname, "../../../../src/main/docs-gen");

export const docsPrefix = "docs";

export const ncMenus = menus;

export const ncRootMenus = menus.filter(x => x.parentId == null);

export class NcDocs {
  ui = new NcUi();
  page: NcPage;
  constructor() {
    this.genComponent();
  }
  init() {
    this.ui.init();
  }
  genComponent() {
    this.page = new NcPage({
      prefix: docsPrefix,
      name: "docs",
      fileName: "docs",
      outlet: true
    });
    handlerPage(this.page, genDir);
  }
}
global["NcDocs"] = new NcDocs();
global["NcDocs"].init();
