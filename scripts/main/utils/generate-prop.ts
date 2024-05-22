import { NcProp, NcPropType } from '../interfaces/prop';

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
            <p>${replaceSpecial(x.description)}</p>`;
            result += selector;
          }
          break;
        case NcPropType.Interface:
        case NcPropType.Class:
          let table = '';
          let inputTable = '';
          let outputTable = '';
          x.properties.forEach((y) => {
            const description = y.description ? `<br/><p [innerHTML]="'${replaceEscape(y.description)}'"></p>` : '';
            let ty = y.type.startsWith('X')
              ? `<code class="popover"
              (click)="types.reference('${y.type}','${x.name}')" [innerText]="'${y.type}'"></code>`
              : `<code [innerText]="'${y.type}'"></code>`;
            let signal = y.signal
              ? `<span class="signal">${(y.signal as string).slice(0, 1).toUpperCase()}</span>`
              : '';
            let tr = `<tr>
              <td>${signal}<code class="name" (click)="types.name('${y.name}', '${x.name}')">${replaceSpecial(y.name)}</code></td>
              <td>${y.label}${description}</td>
              <td>${ty}</td>
              <td><code [innerHTML]="'${replaceEscape(y.default)}'"></code></td>
              <td>${y.withConfig ? '✔️' : ''}</td>
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
            <p>${replaceSpecial(x.description)}</p>`;
          }
          if (inputTable !== '') {
            inputTable = `<table class="x-api-interface">
              <tr>
                <th colspan="5">Input</th>
              </tr>
              <tr>
                <th>{{ "api.property" | xI18n }}</th>
                <th>{{ "api.description" | xI18n }}</th>
                <th>{{ "api.inputType" | xI18n }}</th>
                <th>{{ "api.default" | xI18n }}</th>
                <th>{{ "api.globalConfig" | xI18n }}</th>
              </tr>
              ${inputTable}
            </table>`;
          }
          if (outputTable !== '') {
            outputTable = `<table class="x-api-interface">
              <tr>
                <th colspan="5">Output</th>
              </tr>
              <tr>
                <th>{{ "api.property" | xI18n }}</th>
                <th>{{ "api.description" | xI18n }}</th>
                <th>{{ "api.outputType" | xI18n }}</th>
                <th>{{ "api.default" | xI18n }}</th>
                <th>{{ "api.globalConfig" | xI18n }}</th>
              </tr>
              ${outputTable}
            </table>`;
          }
          if (table !== '') {
            table = `<table class="x-api-interface">
              <tr>
                <th>{{ "api.property" | xI18n }}</th>
                <th>{{ "api.description" | xI18n }}</th>
                <th>{{ "api.type" | xI18n }}</th>
                <th>{{ "api.default" | xI18n }}</th>
                <th>{{ "api.globalConfig" | xI18n }}</th>
              </tr>
              ${table}
            </table>`;
          }
          table = `${head}${inputTable}${outputTable}${table}`;
          result += table;
          break;
        case NcPropType.Type:
          typeTable += `<tr>
            <td><code [innerText]="'${x.name}'"></code></td>
            <td>${x.label}</td>
            <td><code [innerText]="'${replaceEscape(x.value as string)}'"></code></td>
          </tr>`;
          break;
      }
    });
    if (typeTable !== '') {
      typeTable = `<h3>Type</h3>
      <table class="x-api-type">
        <tr>
          <th>{{ "api.type" | xI18n }}</th>
          <th>{{ "api.description" | xI18n }}</th>
          <th>{{ "api.value" | xI18n }}</th>
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
    '"': '\\"',
    '<': '\\<',
    '>': '\\>'
  };
  return str.replace(/[<>"']/g, (m) => map[m]);
}

export function replaceSpecial(str: string) {
  let map = {
    '{': '&#123;',
    '}': '&#125;',
    '<': '&lt;',
    '>': '&gt;'
  };
  return str.replace(/[<>{}]/g, (m) => map[m]);
}
