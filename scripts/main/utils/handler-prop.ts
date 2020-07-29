import * as fs from 'fs-extra';
import * as readline from 'readline';
import { NcProp, NcPropType, NcDecorator, NcPrope } from '../interfaces/prop';

/**
 * 属性文件处理
 * 获取属性文件中配置的输入输出参数，以及类型定义文件
 *
 * @export
 * @param {string} fsPath
 * @param {string} lang
 */
export function hanlderProp(fsPath: string, lang = ''): Promise<NcProp[]> {
  return new Promise((res, rej) => {
    if (!fs.existsSync(fsPath)) {
      res([]);
      return;
    }
    const lines = readline.createInterface({
      input: fs.createReadStream(fsPath)
    });
    let props: NcProp[] = [];
    let prop: NcProp = {};
    let index = 1;
    let doc = [];
    let isReadDoc = false;
    let isReadProp = false;
    let isReadComDir = false;
    let isReadType = false;
    let isReadConst = false;
    let docItem: any = {};

    lines.on('line', (line: string) => {
      line = line.trim();
      if (isReadDoc) {
        docItem[index] = line.startsWith('*') ? line.replace('*', '').trim() : line;
      }
      if (line.startsWith('/**')) {
        isReadDoc = true;
        docItem[index] = '';
        docItem.start = index;
      } else if (line.startsWith('*/')) {
        isReadDoc = false;
        docItem.end = index;
        line = line.replace('*/', '');
        docItem[index] = line;
        doc.push(docItem);
        docItem = {};
      } else if (line.startsWith('@Component') || line.startsWith('@Directive')) {
        isReadComDir = true;
      } else if (line.startsWith('export')) {
        let docItem = doc.find((x) => x.end == index - (isReadComDir ? 2 : 1));
        let undocument = getDocs(docItem, 'undocument') as string;
        if (docItem && undocument !== 'true') {
          let type = line.replace('export', '').trim();
          prop.type = type.slice(0, type.indexOf(' ')) as NcPropType;
          let name = type.replace(prop.type, '').trim();
          prop.name = name.slice(0, name.indexOf(' '));
          const labelLang = getDocs(docItem, lang) as string;
          prop.label = labelLang ? labelLang : docItem[docItem.start + 1];
          prop.description = getDocs(docItem, 'description') as string;
          prop.properties = [];
          switch (prop.type) {
            case NcPropType.Const:
              isReadConst = true;
              prop.value = line.replace(/(.*) \= (.*);/, '$2');
              if (prop.name.endsWith('Prefix')) {
                prop.selector = getDocs(docItem, 'selector') as string;
                prop.decorator = getDocs(docItem, 'decorator') as NcDecorator;
              }
              props.push(prop);
              prop = {};
              break;
            case NcPropType.Interface:
            case NcPropType.Class:
              isReadProp = true;
              break;
            case NcPropType.Type:
              isReadType = true;
              prop.value = line.replace(/(.*) \= (.*);/, '$2');
              props.push(prop);
              prop = {};
              break;
          }
        }
      } else if (line.startsWith('}')) {
        isReadProp = false;
        isReadComDir = false;
        if (JSON.stringify(prop) != '{}') {
          props.push(prop);
          prop = {};
        }
      }
      if (!isReadDoc && isReadProp && line != '' && !line.startsWith('export')) {
        const docItem = doc.find((x) => x.end == index - 1);
        let ix = line.indexOf(': ');

        if (line.indexOf('@Output') !== -1) ix = line.indexOf('=');
        const lf = line.slice(0, ix).trim();
        const rt = line.slice(ix + 1, line.length).trim();

        const propd = lf.replace(/, /g, ',').split(' ');
        const propType = propd.length > 1 ? propd[0].replace(/\@(.*)\((.*)/, '$1') : '';
        let name = propd[propd.length - 1].replace('?', '').trim();
        let type = '',
          val = '';
        if (rt.indexOf(' = ') !== -1) {
          const spt = rt.split('=');
          type = spt[0].trim();
          val = spt[1].replace(';', '').trim();
        } else {
          type = rt.replace(';', '').trim();
        }
        if (propType === 'Output') {
          type = type.indexOf('<') !== -1 ? type.replace(/(.*)\<(.*)\>(.*)/, '$2') : '';
        }
        if (docItem) {
          let def = getDocs(docItem, 'default') as string;
          const label = getDocs(docItem, lang) as string;
          const description = getDocs(docItem, 'description') as string;
          const property: NcPrope = {
            name: name,
            type: type,
            label: label ? label : docItem[docItem.start + 1],
            default: def ? def : val,
            description: description,
            decorator: propd.length > 1 ? propd.filter((x) => x.indexOf('@') !== -1) : [],
            attr: propd.length > 1 && propd[0].indexOf("'") !== -1 ? propd[0].replace(/(.*)\(\'(.*)\'\)/, '$2') : name,
            propType: propType
          };
          prop.properties.push(property);
        }
      }
      index++;
    });
    lines.on('close', () => {
      res(props);
    });
  });
}

/**
 * 获取注释内容
 *
 * @export
 * @param {object} doc
 * @param {string} prop
 * @param {boolean} all
 * @returns
 */
export function getDocs(doc: object, prop: string, all: boolean = false) {
  let result = '';
  let results = [];
  for (const key in doc) {
    if (doc[key].toString().startsWith(`@${prop}`)) {
      let value = doc[key].replace(`@${prop}`, '').trim();
      if (all) {
        results.push(value);
      } else {
        result = value;
        break;
      }
    }
  }
  return all ? results : result;
}
