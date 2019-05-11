import { NcUi } from "./ui";
import { NcPage } from "../../interfaces";
import { generatePage } from "../../utils";
import * as path from "path";

const genDir = path.resolve(__dirname, "../../../../src/main/docs-gen");

export const docsPrefix = "docs";

export class NcDocs {
  ui = new NcUi();
  constructor() {
    this.genComponent();
    this.ui.init();
  }
  genComponent() {
    let page = new NcPage({
      prefix: docsPrefix,
      name: "docs",
      fileName: "docs",
      outlet: true
    });
    generatePage(page, genDir);
  }
}

export const docs = new NcDocs();
