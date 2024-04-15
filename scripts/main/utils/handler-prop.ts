import * as fs from 'fs-extra';
import * as readline from 'readline';
import { NcProp, NcPropType, NcPrope } from '../interfaces/prop';

const DocKeywords = [
  '@zh_CN',
  '@en_US',
  '@selector',
  '@decorator',
  '@example',
  '@default',
  '@withConfig',
  '@undocument'
];

function startWithKeyword(line: string) {
  let res = false;
  for (let key of DocKeywords) {
    if (line.startsWith(key)) {
      res = true;
      break;
    }
  }
  return res;
}

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
    let isReadClassInterface = false;
    let isReadComDir = false;
    let isReadType = false;
    let isReadConst = false;
    let isReadEnum = false;
    let isReadFunction = false;
    let docItem: any = {};

    const addProp = () => {
      props.push(prop);
      prop = {};
    };

    const addParams = (str: string) => {
      const paramRegex = /(\w+): (\w+(?:\[\]|<.*?>)?)/g;
      let paramMap: { [key: string]: string } = {};
      let match: RegExpExecArray;
      while ((match = paramRegex.exec(str)) !== null) {
        paramMap[match[1]] = match[2];
      }
      return paramMap;
    };

    lines.on('line', (line: string) => {
      line = line.trim();
      if (isReadDoc) {
        docItem[index] = line.startsWith('*') ? line.replace('*', '').trim() : line;
      }
      if (isReadConst) {
        if (line === '') {
          const val = prop.value as string;
          if (val.endsWith(';')) {
            prop.value = val.slice(0, val.length - 1);
          }
          isReadConst = false;
          addProp();
        } else {
          prop.value += line;
        }
      }
      if (isReadType) {
        if (line === '') {
          isReadType = false;
          addProp();
        } else {
          prop.value += line;
        }
      }
      if (isReadEnum) {
        if (line === '}') {
          prop.value += '}';
          isReadEnum = false;
          addProp();
        } else {
          if (!prop.value) {
            prop.value = '{';
          }
          prop.value += line;
        }
      }
      if (isReadFunction) {
        if (line.endsWith('{')) {
          prop['_params'] = prop['_params'] + line.slice(0, line.lastIndexOf(':')).trim();
          prop.params = addParams(prop['_params']);
          prop.returnType = line.slice(2, line.length - 1).trim();
          delete prop['_params'];
          isReadFunction = false;
          addProp();
        } else {
          prop['_params'] += line;
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
      } else if (line.startsWith('export ')) {
        let docItem = doc.find((x) => x.end == index - (isReadComDir ? 2 : 1));
        let undocument = getDocs(docItem, '@undocument') as string;
        if (docItem && undocument !== 'true') {
          const tmatch = line.match(/\S+\s+\S+/);
          if (tmatch) {
            prop.type = tmatch[0].split(' ')[1] as NcPropType;
          }
          let eline = line.replace(/^.*? \S+ \s*/, '');
          const { label, description } = getLabelAndDescription(docItem, lang);
          const example = getDocs(docItem, '@example') as string;
          prop.label = label ? label : docItem[docItem.start + 1];
          prop.description = description;
          prop.example = example;
          prop.properties = [];
          switch (prop.type) {
            case NcPropType.Const:
              if (!isReadConst) {
                isReadConst = true;
                prop.name = eline.match(/^\S+/)[0];
                if (prop.name.endsWith(':')) {
                  prop.name = prop.name.slice(0, prop.name.indexOf(':'));
                }
                if (prop.name.endsWith('Prefix')) {
                  prop.selector = getDocs(docItem, '@selector') as string;
                }
                prop.value = eline.match(/=\s*(.*)/)[1].trim();
                if (prop.value.endsWith(';')) {
                  prop.value = prop.value.slice(0, prop.value.length - 1);
                  isReadConst = false;
                  addProp();
                }
              }
              break;
            case NcPropType.Interface:
            case NcPropType.Class:
              if (!isReadClassInterface) {
                isReadClassInterface = true;
                prop.name = eline.match(/^\S+/)[0];
                eline = eline.replace(prop.name, '').trim();
                if (eline.startsWith('extends ')) {
                  eline = eline.replace('extends', '').trim();
                  prop.extends = eline.slice(0, eline.indexOf(' '));
                  eline = eline.replace(`${prop.extends}`, '').trim();
                }
                if (eline.startsWith('implements ')) {
                  eline = eline.replace('implements', '').trim();
                  prop.implements = eline.slice(0, eline.indexOf(' '));
                  eline = eline.replace(`${prop.implements}`, '').trim();
                }
              }
              break;
            case NcPropType.Type:
              if (!isReadType) {
                isReadType = true;
                prop.name = eline.match(/^\S+/)[0];
                prop.value = eline.replace(/(.*) \= (.*);/, '$2');
                if (prop.value.endsWith(';')) {
                  prop.value = prop.name.slice(0, prop.name.indexOf(';'));
                  isReadType = false;
                  addProp();
                }
              }
              break;
            case NcPropType.Function:
              if (!isReadFunction) {
                isReadFunction = true;
                prop.name = eline.slice(0, eline.indexOf('('));
                eline = eline.replace(prop.name, '');
                if (eline.endsWith('{')) {
                  prop['_params'] = eline.slice(0, eline.lastIndexOf(':')).trim();
                  prop.params = addParams(prop['_params']);
                  eline = eline.replace(prop['_params'], '').trim();
                  prop.returnType = eline.slice(1, eline.length - 1).trim();
                  delete prop['_params'];
                  isReadFunction = false;
                  addProp();
                } else {
                  prop['_params'] = eline;
                }
              }
              break;
            case NcPropType.Enum:
              if (!isReadEnum) {
                isReadEnum = true;
                prop.name = eline.match(/^\S+/)[0];
              }
              break;
          }
        }
      } else if (line === '}') {
        isReadClassInterface = false;
        isReadComDir = false;
        if (JSON.stringify(prop) != '{}') {
          addProp();
        }
      }
      if (!isReadDoc && isReadClassInterface && line !== '' && !line.startsWith('export')) {
        const docItem = doc.find((x) => x.end === index - 1);
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
          let def = getDocs(docItem, '@default') as string;
          let withConfig = getDocs(docItem, '@withConfig') as string;
          let example = getDocs(docItem, '@example', true) as string;
          const { label, description } = getLabelAndDescription(docItem, lang);
          const attr = (
            propd.length > 1 && propd[0].indexOf("'") !== -1 ? propd[0].replace(/(.*)\(\'(.*)\'\)/, '$2') : name
          ).replace(/@/g, '&#64;');

          const property: NcPrope = {
            name,
            type,
            label: label ? label : docItem[docItem.start + 1],
            default: def ? def : val,
            withConfig: Boolean(withConfig),
            description,
            decorator: propd.length > 1 ? propd.filter((x) => x.indexOf('@') !== -1) : [],
            attr,
            propType,
            example
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
 * @returns
 */
export function getDocs(doc: object, prop: string, md: boolean = false) {
  let result = '';
  let start = false;
  for (const key in doc) {
    let val = doc[key].toString();
    if (startWithKeyword(val) && val.startsWith(prop)) {
      result = val.replace(prop, '').trim().replace(/@/g, '&#64;');
      if (!md) {
        result = result.replace(/@/g, '&#64;');
      }
      start = true;
    } else if (start) {
      if (!startWithKeyword(val) && !['start', 'end'].includes(key)) {
        if (!md) {
          val = val.replace(/@/g, '&#64;');
        }
        result += `${result !== '' ? '\n' : ''}${val}`;
      } else {
        start = false;
        break;
      }
    }
  }
  return result;
}

/**
 * 根据指定语言获取注释内容中的标签和描述
 * @param doc
 * @param lang
 */
export function getLabelAndDescription(doc: object, lang: string) {
  const result = {
    label: '',
    description: ''
  };
  let dStart = false;
  for (const key in doc) {
    const val = doc[key].toString();
    if (val.startsWith(`@${lang}`)) {
      result.label = val.replace(`@${lang}`, '').trim();
      dStart = true;
    } else if (dStart) {
      if (!val.startsWith(`@`) && val !== '' && !['start', 'end'].includes(key)) {
        result.description += `${result.description !== '' ? '\n' : ''}${val}`;
      } else {
        dStart = false;
      }
    }
  }
  result.label = result.label.replace(/@/g, '&#64;');
  result.description = result.description;

  return result;
}
