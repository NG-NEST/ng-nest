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
            let withConfig = y.decorator.find((x) => x.startsWith('@XWithConfig'));
            let isWithConfig = withConfig ? true : false;
            if (withConfig && !y.default) {
              const st = withConfig.match(/\((\S*)\)/)[1].split(',');
              if (st.length >= 2) {
                y.default = st[st.length - 1];
              }
            }
            if (!isWithConfig && y.withConfig) {
              isWithConfig = true;
            }
            const description = y.description ? `<p [innerHTML]="'${replaceEscape(y.description)}'"></p>` : '';
            // let ty = y.type.startsWith('X')
            //   ? `<code class="popover" x-popover [content]="typeTpl"
            //   [minWidth]="'10rem'"
            //   [maxWidth]="'30rem'"
            //   (mouseenter)="types.getTypes('${y.type}','${x.name}')" [innerText]="'${y.type}'"></code>`
            //   : `<code [innerText]="'${y.type}'"></code>`;
            let ty = y.type.startsWith('X')
              ? `<code class="popover"
              (click)="types.reference('${y.type}','${x.name}')" [innerText]="'${y.type}'"></code>`
              : `<code [innerText]="'${y.type}'"></code>`;
            let tr = `<tr>
              <td><span><code>${y.attr}</code></span></td>
              <td>${y.label}${description}</td>
              <td>${ty}</td>
              <td><code [innerHTML]="'${replaceEscape(y.default)}'"></code></td>
              <td>${isWithConfig ? '✔' : ''}</td>
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
            let extend = '';
            if (x.extends && x.extends !== 'XProperty') {
              extend = x.extends.replace('<', '&lt;');
              extend = extend.replace('>', '&gt;');
            }
            head = `<h3>${x.name}${
              extend ? ` {{ "api.extends" | xI18n }} ${extend} {{ "api.extendsDescription" | xI18n }}` : ''
            }</h3>
            <p>${x.description}</p>`;
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
  return str.replace(/[&<>"']/g, (m) => map[m]);
}
