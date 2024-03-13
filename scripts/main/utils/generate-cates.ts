import * as fs from 'fs-extra';
import * as path from 'path';
import { NcCates, NcCate } from '../interfaces/examples';
import { handlerTabs, handlerTabsByFiles, randomString, generateTabs, hasIn } from '.';
import { NcTabsLayoutEnum, NcTab, NcTabsSizeEnum, NcTabsNodeJustifyEnum, NcTabsTypeEnum } from '../interfaces/tabs';
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
export async function generateCates(cates: NcCates, comTpl: NcTemplate): Promise<NcCates> {
  if (cates.list.length > 0) {
    let subFunc = '';
    while (subFunc == '' || hasIn(comTpl.syswords.constant, subFunc)) subFunc = randomString();
    let catesTabs = handlerTabs({
      layout: NcTabsLayoutEnum.Top,
      nodeJustify: NcTabsNodeJustifyEnum.Center,
      size: NcTabsSizeEnum.Medium,
      tabsType: NcTabsTypeEnum.Block,
      tabsLinkRouter: false,
      folderPath: cates.folderPath
    });
    catesTabs.tabs.forEach(async (x) => {
      await generateFiles(
        x,
        cates.list.find((y) => y.name == x.name),
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
    nodeJustify: NcTabsNodeJustifyEnum.Center,
    size: NcTabsSizeEnum.Medium,
    tabsType: NcTabsTypeEnum.Tag,
    tabsAnimated: false,
    tabsLinkRouter: false,
    folderPath: folderPath,
    id: func
  });
  let html = '';
  let files = [];
  let providers = [];
  let otherNames = [];
  childTabs.tabs.forEach((x, index) => {
    let param = '';
    while (param == '' || hasIn(comTpl.syswords.constant, param)) param = randomString();
    let tpl = highlightTpl;
    let content =
      x.content.lastIndexOf('\n') == x.content.length - 1 ? x.content.slice(0, x.content.length - 1) : x.content;
    let ext = x.name.slice(x.name.lastIndexOf('.') + 1, x.name.length);
    let type = extToType[ext];
    tpl = replaceKey(tpl, '__type', type);
    tpl = replaceKey(tpl, '__data', param);
    if (type == extToType.ts) {
      content = handlerContent(content);
    }
    comTpl.syswords.constant += `${param}=\`${content}\`;\n`;
    files.push(`'src/app/${tab.name}/${x.name}': ${param}`);
    if (x.name.lastIndexOf('.service.ts') == x.name.length - 11)
      providers.push(`'${x.name.replace('.service.ts', '')}'`);
    if (childTabs.tabs.length - 1 !== index) comTpl.syswords.constant += `  `;
    if (x.name == `${tab.name}.component.ts`) {
      html = `<${cate.selector}></${cate.selector}>`;
    } else if (x.name.lastIndexOf('.component.ts') > 0) {
      otherNames.push(`'${x.name.replace('.component.ts', '')}'`);
    }
    x.content = tpl;
  });
  tab.content = `
  ${tab.content ? `<div class="x-examples-info">${tab.content}</div>\n` : ''}
  <div class="x-examples-html">${html}${generateTools(tab.name, otherNames, providers, files)}</div>\n
  <div class="x-examples-code">${generateTabs(childTabs).content}</div>\n
  `;

  return tab;
}

export function generateTools(name: string, otherNames: string[], providers: string[], files: string[]) {
  return `<div class="x-examples-tools">  
  <x-buttons space="0.2" hiddenBorder>
    <x-button
      icon="fto-zap"
      onlyIcon
      flat
      x-tooltip
      content="从 StackBlitz 打开"
      placement="top"
      (click)="
        this.ois.openStackBlitz('${name}', [${otherNames.join(', ')}], [${providers.join(', ')}], {
          ${files.join(', ')}
        })
      "
    ></x-button>
  </x-buttons>
</div>`;
}

/**
 * ts文件中特殊字符处理
 */
export function handlerContent(content: string) {
  let special = ['${', `\``];
  special.forEach((x) => {
    if (content.indexOf(x) > -1) {
      let rep = '\\' + x;
      x = x === '${' ? '\\${' : x;
      content = content.replace(new RegExp(x, 'g'), rep);
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
