import * as fs from 'fs-extra';
import { checkMkdir } from './check-mkdir';
import { NcPattern } from '../interfaces/pattern';

/**
 * 生成样式文件代码
 *
 * @export
 * @param {NcPattern[]} patterns
 */
export function generatePatterns(...patterns: NcPattern[]) {
  let result = '';
  let patternsTable = '';
  if (patterns && patterns.length > 0) {
    patterns.forEach(x => {
      patternsTable += `<tr>
            <td><code>${x.name}</code></td>
            <td>${x.label}</td>
            <td><code>${x.value == x.inherit ? '' : x.value}</code></td>
            <td><code>${x.inherit}</code></td>
          </tr>`;
    });
    if (patternsTable !== '') {
      patternsTable = `
      <table>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>继承</th>
          <th>值</th>
        </tr>
        ${patternsTable}
      </table>`;
      result += patternsTable;
    }
  }

  return result;
}
