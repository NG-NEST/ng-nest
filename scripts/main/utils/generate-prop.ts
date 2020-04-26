import { NcProp, NcPropType, NcDecorator, NcPrope } from '../interfaces/prop';

/**
 * 生成属性文件代码
 */
export function generateProps(...types: NcProp[]) {
  let result = '';
  let typeTable = '';
  if (types && types.length > 0) {
    types.forEach((x) => {
      switch (x.type) {
        case NcPropType.Const:
          if (x.name.endsWith('Prefix')) {
            let selector = `<h3 class="x-api-selector"><span>${x.selector}</span> <span>${x.decorator}</span></h3>
            <p>${x.description}</p>`;
            result += selector;
          }
          break;
        case NcPropType.Interface:
        case NcPropType.Class:
          let table = '';
          let inputTable = '';
          let outputTable = '';

          x.properties.forEach((y) => {
            let tr = `<tr>
              <td><span><code>${y.attr}</code></span></td>
              <td><code [innerHTML]="'${y.type}'"></code></td>
              <td><code [innerHTML]="'${replaceEscape(y.default)}'"></code></td>
              <td>${y.label}<span>${y.description}</span></td>
            </tr>`;
            switch (y.propType) {
              case 'Input':
                inputTable += tr;
                break;
              case 'Output':
                outputTable += tr;
                break;
              default:
                table += tr;
                break;
            }
          });
          let head = '';
          if (table !== '' || inputTable !== '' || outputTable !== '') {
            head = `<h3>${x.name}</h3>
            <p>${x.description}</p>`;
          }
          if (inputTable !== '') {
            inputTable = `<table class="x-api-interface">
              <tr>
                <th colspan="4">Input</th>
              </tr>
              <tr>
                <th>参数</th>
                <th>输入类型</th>
                <th>默认值</th>
                <th>说明</th>
              </tr>
              ${inputTable}
            </table>`;
          }
          if (outputTable !== '') {
            outputTable = `<table class="x-api-interface">
              <tr>
                <th colspan="4">Output</th>
              </tr>
              <tr>
                <th>参数</th>
                <th>输出类型</th>
                <th>默认值</th>
                <th>说明</th>
              </tr>
              ${outputTable}
            </table>`;
          }
          if (table !== '') {
            table = `<table class="x-api-interface">
              <tr>
                <th>参数</th>
                <th>类型</th>
                <th>默认值</th>
                <th>说明</th>
              </tr>
              ${table}
            </table>`;
          }
          table = `${head}${inputTable}${outputTable}${table}`;
          result += table;
          break;
        case NcPropType.Type:
          typeTable += `<tr>
            <td><code [innerHTML]="'${x.name}'"></code></td>
            <td><code [innerHTML]="'${replaceEscape(x.value as string)}'"></code></td>
            <td>${x.label}</td>
          </tr>`;
          break;
      }
    });
    if (typeTable !== '') {
      typeTable = `<h3>Type</h3>
      <table class="x-api-type">
        <tr>
          <th>类型</th>
          <th>值</th>
          <th>说明</th>
        </tr>
        ${typeTable}
      </table>`;
      result += typeTable;
    }
  }

  return result;
}

export function replaceEscape(str: string) {
  let map = {
    "'": "\\'",
    '"': '\\"'
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
}
