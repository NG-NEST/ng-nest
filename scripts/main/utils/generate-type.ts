import * as fs from "fs-extra";
import { checkMkdir } from "./check-mkdir";
import { NcType, NcObjectType } from "../interfaces/type";

/**
 * 生成类型文件代码
 *
 * @export
 * @param {NcType[]} types
 */
export function generateTypes(...types: NcType[]) {
  let result = "";
  let typeTable = "";
  if (types && types.length > 0) {
    types.forEach(x => {
      switch (x.object) {
        case NcObjectType.Const:
          if (x.name.endsWith("Prefix")) {
            let selector = `<h3 class="nm-api-selector"><span>${
              x.selector
            }</span> <span>${x.decorator}</span></h3>
            <p>${x.description}</p>`;
            result += selector;
          }
          break;
        case NcObjectType.Interface:
          let table = "";
          x.properties.forEach(y => {
            table += `<tr>
                <td>[<span><code>${y.name}</code></span>]</td>
                <td>${y.label}<span>${y.description}</span></td>
                <td><code>${y.type}</code></td>
                <td><code>${y.defalut}</code></td>
              </tr>`;
          });
          table = `<h3>${x.name}</h3>
            <p>${x.description}</p>
            <table class="nm-api-interface">
              <tr>
                <th>参数</th>
                <th>说明</th>
                <th>类型</th>
                <th>默认值</th>
              </tr>
              ${table}
            </table>`;
          result += table;
          break;
        case NcObjectType.Type:
          typeTable += `<tr>
            <td><code>${x.name}</code></td>
            <td>${x.label}</td>
            <td><code>${x.value}</code></td>
          </tr>`;
          break;
      }
    });
    if (typeTable !== "") {
      typeTable = `<h3>Type</h3>
      <table class="nm-api-type">
        <tr>
          <th>类型</th>
          <th>说明</th>
          <th>值</th>
        </tr>
        ${typeTable}
      </table>`;
      result += typeTable;
    }
  }

  return result;
}
