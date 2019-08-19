import * as fs from "fs-extra";
import { checkMkdir } from "./check-mkdir";
import { NcType } from "../interfaces/type";

/**
 * 生成类型文件代码
 *
 * @export
 * @param {NcPage} page
 */
export function generateTypes(...types: NcType[]) {
  let result = "";
  if (types && types.length > 0) {
    types.forEach(x => {
      let table = "";
      x.properties.forEach(y => {
        table += `<tr>
          <td>${y.name}</td>
          <td>${y.label}<span>${y.description}</span></td>
          <td>${y.type}</td>
          <td>${y.defalut}</td>
        </tr>`;
      });
      table = `<h3>${x.name}</h3>
      <p>${x.description}</p>
      <table>
        <tr>
          <th>属性名</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
        ${table}
      </table>`;
      result += table;
    });
  }

  return result;
}
