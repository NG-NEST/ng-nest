import * as fs from 'fs-extra';
import * as path from 'path';
import { mdToHtml } from '../../../utils';
import { NcUiPage } from '.';

export class NcComponents {
  private componentsPath: string;
  init(folder: string) {
    this.componentsPath = path.resolve(__dirname, folder);
    const componentsFolder = fs.readdirSync(this.componentsPath);
    componentsFolder.forEach(dirName => {
      const readmePath = this.getReadmePath(dirName);
      let html = mdToHtml(readmePath);
      let page = new NcUiPage(dirName);
    });
  }
  getReadmePath(dirName: string) {
    return path.resolve(this.componentsPath, dirName, 'readme.md');
  }
}
