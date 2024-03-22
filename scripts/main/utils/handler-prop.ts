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
    let isReadEnum = false;
    let isReadFunction = false;
    let docItem: any = {};

    lines.on('line', (line: string) => {
      line = line.trim();
      if (isReadDoc) {
        docItem[index] = line.startsWith('*') ? line.replace('*', '').trim() : line;
      }
      if (isReadConst) {
        if (line === '') {
          props.push(prop);
          prop = {};
          isReadConst = false;
        } else {
          prop.value += line;
        }
      }
      if (isReadEnum) {
        if (line === '}') {
          prop.value += '}';
          props.push(prop);
          prop = {};
          isReadEnum = false;
        } else {
          if (!prop.value) {
            prop.value = '{';
          }
          prop.value += line;
        }
      }
      if (isReadFunction) {
        if (!line.endsWith('{')) {
          prop.name += line;
        } else {
          prop.name += line.substring(0, line.length - 1);
          props.push(prop);
          prop = {};
          isReadFunction = false;
        }
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
          let overLine = name.replace(`${prop.name}`, '').trim();
          if (overLine.startsWith('extends')) {
            overLine = overLine.replace('extends', '').trim();
            prop.extends = overLine.slice(0, overLine.indexOf(' '));
            overLine = overLine.replace(`${prop.extends}`, '').trim();
          }
          if (overLine.startsWith('implements')) {
            overLine = overLine.replace('implements', '').trim();
            prop.implements = overLine.slice(0, overLine.indexOf(' '));
            overLine = overLine.replace(`${prop.implements}`, '').trim();
          }
          const labelLang = getDocs(docItem, lang) as string;
          prop.label = labelLang ? labelLang : docItem[docItem.start + 1];
          prop.description = getDocs(docItem, 'description') as string;
          prop.properties = [];
          switch (prop.type) {
            case NcPropType.Const:
              isReadConst = true;
              prop.value = line.replace(/(.*) \= (.*);/, '$2');
              if (prop.value === line) {
                prop.value = line.replace(/(.*) \= (.*)/, '$2');
              }
              if (prop.name.endsWith(':')) {
                prop.name = prop.name.slice(0, prop.name.length - 1);
              }
              if (prop.name.endsWith('Prefix')) {
                prop.selector = getDocs(docItem, 'selector') as string;
                prop.decorator = getDocs(docItem, 'decorator') as NcDecorator;
              }
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
              isReadType = false;
              break;
            case NcPropType.Function:
              isReadFunction = true;

              prop.name = line.replace(/(.*) function (.*)\{/, '$2').trim();
              if (line === 'export function XSetFlex(') {
                console.log("__________________________________");
                console.log(prop.name, line);
              }
              if (prop.name === line) {
                prop.name = line.replace(/(.*) function (.*)/, '$2');
              } else {
                props.push(prop);
                prop = {};
                isReadFunction = false;
              }
              break;
            case NcPropType.Enum:
              isReadEnum = true;
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
        if (line.startsWith('[')) {
          ix = line.indexOf(': ', line.indexOf(': ') + ': '.length);
        }
        if (line.indexOf('@Output') !== -1) ix = line.indexOf('=');
        const lf = line.slice(0, ix).trim();
        const rt = line.slice(ix + 1, line.length).trim();

        let propd: string[] = [];
        if (lf.startsWith('[')) {
          propd = [lf];
        } else {
          propd = lf.replace(/, /g, ',').split(' ');
        }

        const propType = propd.length > 1 ? propd[0].replace(/\@(.*)\((.*)/, '$1') : '';
        let name = propd[propd.length - 1].replace(/\?|\!/g, '').trim();
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
          let withConfig = getDocs(docItem, 'withConfig') as string;
          const label = getDocs(docItem, lang) as string;
          const description = getDocs(docItem, 'description') as string;
          const attr = (
            propd.length > 1 && propd[0].indexOf("'") !== -1 ? propd[0].replace(/(.*)\(\'(.*)\'\)/, '$2') : name
          ).replace(/@/g, '&#64;');
          const property: NcPrope = {
            name: name,
            type: type,
            label: label ? label : docItem[docItem.start + 1],
            default: def ? def : val,
            withConfig: Boolean(withConfig),
            description: description,
            decorator: propd.length > 1 ? propd.filter((x) => x.indexOf('@') !== -1) : [],
            attr: attr,
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
      value = value.replace(/@/g, '&#64;');
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
