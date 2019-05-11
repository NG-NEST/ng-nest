import * as fs from "fs-extra";
import * as path from "path";
import { mdToHtml } from "../../../utils";
import { NcUiPage } from ".";

export class NcComponents {
  private componentsPath: string;
  init(folder: string) {
    this.componentsPath = path.resolve(__dirname, folder);
    const componentsFolder = fs.readdirSync(this.componentsPath);
    componentsFolder.forEach(dirName => {
      const readmePath = this.getReadmePath(dirName);
      let html = mdToHtml(readmePath);
      let page = new NcUiPage(dirName);

      if (html) {
        // console.log(html);
        // if (dirName === "icon") {
        //   // html += iconsTemplate(dirName).content;
        //   iconTemplate = iconsTemplateRe(dirName);
        //   html += iconTemplate.content;
        // }
        // docComponentHtml(
        //   html,
        //   `${docsComponentsPath}/components/${dirName}`,
        //   dirName,
        //   iconTemplate
        // );
      }
    });
  }
  getReadmePath(dirName: string) {
    return path.resolve(this.componentsPath, dirName, "readme.md");
  }
}
