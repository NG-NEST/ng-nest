import { NcTabsLayoutEnum, NcTabsNodeJustifyEnum, NcTabsSizeEnum, NcTabsTypeEnum } from './../interfaces/tabs';
import * as path from 'path';
import * as fs from 'fs-extra';
import { NcPage } from '../interfaces/page';
import { NcExamples, NcCates } from '../interfaces/examples';
import {
  replaceKey,
  randomString,
  generateTabs,
  handlerTabs,
  hanlderCates,
  generateCates,
  hanlderPattern,
  generatePatterns,
  hanlderSpec,
  hanlderProp,
  generateProps
} from '.';
import { find, hasIn } from 'lodash';

const tplDir = path.resolve(__dirname, '../../main/templates');

/**
 * 组件处理
 *
 * @export
 * @param {NcPage} page
 */
export async function handlerComponent(page: NcPage) {
  handlerExamples(page);
  await handlerApi(page);
  await handlerPattern(page);
  await handlerSpec(page);
}

/**
 * 示例内容处理
 *
 * @export
 * @param {NcPage} page
 */
export function handlerExamples(page: NcPage) {
  if (page.custom.indexOf('__examples') <= -1) return;
  let examples: NcExamples = {};
  let comTpl = find(page.templates, (x) => x.name == 'component');

  examples.path = path.join(page.path, `examples`);
  examples.tplPath = path.join(tplDir, 'examples-component.template.html');
  let func = '';
  while (func == '' || hasIn(comTpl.syswords.constant, func)) func = randomString();
  let tabs = handlerTabs({
    layout: NcTabsLayoutEnum.Left,
    nodeJustify: NcTabsNodeJustifyEnum.Start,
    size: NcTabsSizeEnum.Large,
    tabsType: NcTabsTypeEnum.Block,
    folderPath: `${examples.path}/${page.lang}`
  });
  tabs.tabs.forEach((x) => {
    let cates: NcCates = { folderPath: path.join(tabs.folderPath, x.name) };
    hanlderCates(cates, page);
    generateCates(cates, comTpl);
    if (cates.content) {
      x.content = cates.content;
    }
  });
  generateTabs(tabs);
  let examplesTpl = fs.readFileSync(examples.tplPath, 'utf8');
  page.custom = replaceKey(page.custom, '__examples', replaceKey(examplesTpl, '__tabs', tabs.content));
  page.copyDir.push({
    from: `${examples.path}/${page.lang}`,
    to: path.join(page.genDir, 'examples'),
    exclude: ['.md']
  });
}

export async function handlerApi(page: NcPage) {
  if (page.custom.indexOf('__api') === -1) return;
  const propertyPath = path.join(page.path, `${page.name}.property.ts`);
  if (fs.existsSync(propertyPath)) {
    let props = await hanlderProp(propertyPath, page.lang);
    page.custom = replaceKey(page.custom, '__api', `<x-api>${generateProps(...props)}</x-api>`);
  }
}

export async function handlerPattern(page: NcPage) {
  if (page.custom.indexOf('__pattern') === -1) return;
  let patterns = await hanlderPattern(path.join(page.path, 'style', `param.scss`));
  page.custom = replaceKey(page.custom, '__pattern', `<x-pattern>${generatePatterns(...patterns)}</x-pattern>`);
}

export async function handlerSpec(page: NcPage) {
  const fileTypes = ['component', 'directive', 'pipe'];
  let fsPath = '';
  for (let fileTpye of fileTypes) {
    fsPath = path.join(page.path, `${page.name}.${fileTpye}.spec.ts`);
    if (fs.existsSync(fsPath)) break;
  }
  let specs = await hanlderSpec(fsPath);
  let mod = page.templates.find((x) => x.type === 'default' && x.name === 'module');
  specs.forEach(async (x) => {
    mod.syswords.imports += `${x.import}\n`;
    mod.syswords.modules += `, ${x.module}`;
    if (x.import.indexOf(`@ng-nest/ui/${page.name}`) !== -1) {
      let temp = page.templates.find((x) => x.name === 'component' && x.type === 'default');
      if (temp !== null) {
        let tpl = fs.readFileSync(path.join(tplDir, 'highlight-component.template.html'), 'utf8');
        let param = randomString(7);
        tpl = replaceKey(tpl, '__type', 'typescript');
        tpl = replaceKey(tpl, '__data', param);
        temp.syswords.constant += `${param} = \`${x.import}\`;\n`;
        page.custom = replaceKey(page.custom, '__component', `${tpl}`);
      }
    }
  });
}
