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
          x.properties.forEach((y) => {
            const description = y.description ? `<br/><p [innerHTML]="'${replaceEscape(y.description)}'"></p>` : '';
            let ty = y.type.startsWith('X')
              ? `<code class="x-api-popover"
              (click)="types.reference('${y.type}','${x.name}')" [innerText]="'${y.type}'"></code>`
              : `<code [innerText]="'${y.type}'"></code>`;
            let signal = y.signal
              ? `<span class="x-api-signal">${(y.signal as string).slice(0, 1).toUpperCase()}</span>`
              : '<span class="x-api-signal">P</span>';
            let tr = `<tr>
              <td>${signal}<code class="x-api-name" (click)="types.name('${y.name}', '${x.name}')">${replaceSpecial(y.name)}</code></td>
              <td>${y.label}${description}</td>
              <td>${ty}</td>
              <td><code [innerHTML]="'${replaceEscape(y.default)}'"></code></td>
              <td>${y.withConfig ? '✔️' : ''}</td>
            </tr>`;

            table += tr;
          });
          let head = '';
          if (table !== '') {
            head = `<h3>${x.name}</h3>
            <p>${replaceSpecial(x.description)}</p>`;
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
          table = `${head}${table}`;
          result += table;
          break;
        case NcPropType.Type:
          const tvalue = (value: string) => {
            if (value.startsWith('X')) {
              return `<code class="x-api-popover"
              (click)="types.reference('${value}', '')" [innerText]="'${replaceEscape(value)}'"></code>`;
            } else {
              return `<code [innerText]="'${replaceEscape(value)}'"></code>`;
            }
          };

          const svalue = (x.value as string).split(' | ');
          const sarray: string[] = [];
          for (let sv of svalue) {
            sarray.push(tvalue(sv));
          }

          typeTable += `<tr>
            <td><code [innerText]="'${x.name}'"></code></td>
            <td>${x.label}</td>
            <td>${sarray.join(' | ')}</td>
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
    '>': '\\>',
    '/': '\\/',
    '{': '\\{',
    '}': '\\}'
  };
  return str.replace(/['"<>/{}]/g, (m) => map[m]);
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
