import * as fs from 'fs-extra';
import * as path from 'path';
import { NcCates, NcCate } from '../interfaces/examples';
import { handlerTabs, handlerTabsByFiles, randomString } from '.';
import { NcTabsLayoutEnum, NcTab } from '../interfaces/tabs';
import { generateTabs } from '.';
import * as _ from 'lodash';
import { replaceKey } from './replace-key';
import { NcTemplate } from '../interfaces/template';

const tplDir = path.resolve(__dirname, '../../main/templates');

/**
 * 生成示例分类
 *
 * @export
 * @param {NcCates} cates
 * @returns
 */
export function generateCates(cates: NcCates, comTpl: NcTemplate): NcCates {
  if (cates.list.length > 0) {
    let subFunc = '';
    while (subFunc == '' || _.hasIn(comTpl.syswords.constant, subFunc)) subFunc = randomString();
    let catesTabs = handlerTabs({
      layout: NcTabsLayoutEnum.Top,
      folderPath: cates.folderPath
    });
    catesTabs.tabs.forEach(x => {
      generateFiles(
        x,
        cates.list.find(y => y.name == x.name),
        comTpl,
        path.join(cates.folderPath, x.name),
        subFunc
      );
    });
    cates.content = generateTabs(catesTabs).content;
  }
  return cates;
}

/**
 * 生成分类文件中的代码
 *
 * @export
 * @param {NcTab} tab
 */
export function generateFiles(tab: NcTab, cate: NcCate, comTpl: NcTemplate, folderPath: string, func: string) {
  let highlightTpl = fs.readFileSync(path.join(tplDir, 'highlight-component.template.html'), 'utf8');
  if (!comTpl) return;
  let childTabs = handlerTabsByFiles({
    layout: NcTabsLayoutEnum.Top,
    folderPath: folderPath,
    id: func
  });
  let html = '';
  childTabs.tabs.forEach((x, index) => {
    let param = '';
    while (param == '' || _.hasIn(comTpl.syswords.constant, param)) param = randomString();
    let tpl = highlightTpl;
    let content =
      x.content.lastIndexOf('\n') == x.content.length - 1 ? x.content.slice(0, x.content.length - 1) : x.content;
    let type = extToType[x.name.slice(x.name.lastIndexOf('.') + 1, x.name.length)];
    tpl = replaceKey(tpl, '__type', type);
    tpl = replaceKey(tpl, '__data', param);
    if (type == extToType.ts) {
      content = handlerContent(content);
    }
    comTpl.syswords.constant += `${param}=\`${content}\`;\n`;
    if (childTabs.tabs.length - 1 !== index) comTpl.syswords.constant += `  `;
    if (x.name == `${tab.name}.component.ts`) {
      html = `<${cate.selector}></${cate.selector}>`;
    }
    x.content = tpl;
  });
  tab.content = `
  <div class="x-examples-html">${html}</div>\n
  <div class="x-examples-info">${tab.content}</div>\n
  <div class="x-examples-code">${generateTabs(childTabs).content}</div>\n
  `;

  return tab;
}

/**
 * ts文件中特殊字符处理
 */
export function handlerContent(content: string) {
  let special = [`\``];
  special.forEach(x => {
    if (content.indexOf(x) > -1) {
      let rep = `\\${x}`;
      content = content.replace(new RegExp(x, 'g'), `${rep}`);
    }
  });
  return content;
}

/**
 * 文件后缀对应的文件类型
 */
export const extToType = {
  ts: 'typescript',
  html: 'html',
  scss: 'scss',
  css: 'css'
};
