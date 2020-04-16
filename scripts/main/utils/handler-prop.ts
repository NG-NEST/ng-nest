import * as fs from 'fs-extra';
import * as readline from 'readline';
import { NcProp, NcPropType, NcDecorator, NcPrope } from '../interfaces/prop';

/**
 * 属性文件处理
 * 获取属性文件中配置的输入输出参数，以及类型定义文件
 *
 * @export
 * @param {string} fsPath
 */
export function hanlderProp(fsPath: string): Promise<NcProp[]> {
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
          prop.label = docItem[docItem.start + 1];
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
        const spt = line.split(':');
        if (spt.length <= 1) spt.push('');
        const sptd = spt[0].split(' ');
        let name = sptd[sptd.length - 1].replace('?', '');
        let type = spt[1].indexOf('=') !== -1 ? spt[1].replace(/ (.*) \= (.*);/, '$1') : spt[1].replace(/ (.*);/, '$1');
        const propType = sptd.length > 1 ? sptd[0].replace(/\@(.*)\((.*)/, '$1') : '';
        if (propType === 'Output') {
          name = sptd.length > 1 ? sptd[1] : '';
          type = line.indexOf('<') !== -1 ? line.replace(/(.*)\<(.*)\>(.*);/, '$2') : '';
        }
        if (docItem) {
          const def = getDocs(docItem, 'default') as string;
          const description = getDocs(docItem, 'description') as string;
          const property: NcPrope = {
            name: name,
            type: type,
            label: docItem[docItem.start + 1],
            defalut: def ? def : spt[1].indexOf('=') !== -1 ? spt[1].replace(/(.*) \= (.*);/, '$2') : '',
            description: description,
            decorator: sptd.length > 1 ? sptd.filter((x) => x.indexOf('@') !== -1) : [],
            attr: sptd.length > 1 && sptd[0].indexOf("'") !== -1 ? sptd[0].replace(/(.*)\(\'(.*)\'\)/, '$2') : name,
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
