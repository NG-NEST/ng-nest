import * as fs from 'fs-extra';
import * as readline from 'readline';
import { NcModule } from '../interfaces/module';

/**
 * 模块文件处理
 * 获取模块文件中 exports 的组件
 *
 * @export
 * @param {string} fsPath
 */
export function hanlderModule(fsPath: string): Promise<NcModule> {
  return new Promise((res, rej) => {
    if (!fs.existsSync(fsPath)) {
      res(null);
      return;
    }
    let lines = readline.createInterface({
      input: fs.createReadStream(fsPath)
    });
    let module: NcModule = { module: '', exports: [] };
    let startExports = false;
    lines.on('line', (line: string) => {
      line = line.trim();
      if (line.startsWith('exports: [')) {
        let pattern = /exports: \[(.*)\]/;
        let re = line.match(pattern);
        if (re) {
          let coms = re[1].split(',');
          for (let i = 0; i < coms.length; i++) {
            const com = coms[i].trim();
            if (com.length > 0) {
              module.exports.push(com);
            }
          }
        } else {
          startExports = true;
        }
      }
      if (startExports) {
        if (line.startsWith(']')) {
          startExports = false;
        } else if (!line.startsWith('exports: [')) {
          module.exports.push(line.replace(/,/g, ''));
        }
      }
      if (line.startsWith('export class ')) {
        let pattern = /export class (.*) {/;
        let re = line.match(pattern);
        module.module = re[1];
      }
    });
    lines.on('close', () => {
      res(module);
    });
  });
}
