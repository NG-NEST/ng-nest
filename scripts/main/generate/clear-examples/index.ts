import * as path from 'path';
import * as fs from 'fs-extra';

export const ngNestUiDir = path.resolve(__dirname, '../../../../dist/ng-nest/ui');
export const excludes = ['esm'];

export class NcClearExamples {
  constructor() {
    let componentsDir = fs.readdirSync(ngNestUiDir);
    for (let dir of componentsDir) {
      let isExclude = false;
      for (let exclude of excludes) {
        if (dir.startsWith(exclude)) {
          isExclude = true;
          break;
        }
      }
      if (isExclude) continue;
      const examplesDir = path.join(ngNestUiDir, dir, 'examples');
      const isExist = fs.existsSync(examplesDir);
      if (isExist) {
        fs.removeSync(examplesDir);
      }
    }
  }
}

global['NcClearExamples'] = new NcClearExamples();
