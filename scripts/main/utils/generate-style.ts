import * as fs from "fs-extra";
import { checkMkdir } from "./check-mkdir";
import { NcStyle } from "../interfaces/style";

/**
 * 生成样式文件代码
 *
 * @export
 * @param {NcStyle[]} styles
 */
export function generateStyles(...styles: NcStyle[]) {
  let result = "";
  let stylesTable = "";
  if (styles && styles.length > 0) {
    styles.forEach(x => {
      stylesTable += `<tr>
            <td><code>${x.name}</code></td>
            <td>${x.label}</td>
            <td><code>${x.value}</code></td>
          </tr>`;
    });
    if (stylesTable !== "") {
      stylesTable = `
      <table>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>值</th>
        </tr>
        ${stylesTable}
      </table>`;
      result += stylesTable;
    }
  }

  return result;
}
