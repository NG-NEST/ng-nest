import * as path from 'path';
import * as fs from 'fs-extra';
import * as readline from 'readline';
import * as _ from 'lodash';
import { NcSpec } from '../interfaces/spec';

/**
 * 测试文件处理
 * 获取测试文件中依赖的模块加入到组件文档模块中
 *
 * @export
 * @param {string} fsPath
 */
export function hanlderSpec(fsPath: string): Promise<NcSpec[]> {
  return new Promise((res, rej) => {
    if (!fs.existsSync(fsPath)) {
      res([]);
      return;
    }
    let lines = readline.createInterface({
      input: fs.createReadStream(fsPath)
    });
    let isReadImport = false;
    lines.on('line', (line: string) => {
      line = line.trim();
      if (line.startsWith('import ')) {
        
      }
    });
  });
}
