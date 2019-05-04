import * as fs from "fs-extra";
import * as path from "path";
import { mdToHtml } from "../../../utils/md-to-html";

export class Components {
  private componentsPath;
  init(folder) {
    this.componentsPath = path.resolve(__dirname, folder);
    const componentsFolder = fs.readdirSync(this.componentsPath);
    componentsFolder.forEach(dirName => {
      const readmePath = `${this.componentsPath}/${dirName}/readme.md`;
      let html = mdToHtml(readmePath);
      let iconsTemplate = "";
      if (html) {
        console.log(html);
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
}
