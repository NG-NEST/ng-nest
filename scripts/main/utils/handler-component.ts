import { NcTabsLayoutEnum, NcTabsNodeJustifyEnum, NcTabsSizeEnum, NcTabsTypeEnum } from './../interfaces/tabs';
import * as path from 'path';
import * as fs from 'fs-extra';
import { NcPage } from '../interfaces/page';
import { NcExamples, NcCates } from '../interfaces/examples';
import {
  replaceKey,
  randomString,
  hanlderCates,
  generateCates,
  hanlderPattern,
  generatePatterns,
  hanlderModule,
  hanlderProp,
  generateProps,
  hasIn,
  firstLetterCapital
} from '.';

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
  await handlerModule(page);
}

/**
 * 示例内容处理
 *
 * @export
 * @param {NcPage} page
 */
export function handlerExamples(page: NcPage): Promise<void> {
  if (page.custom.indexOf('__examples') <= -1) return;
  let examples: NcExamples = {};
  let comTpl = page.templates.find((x) => x.name == 'component');

  examples.path = path.join(page.path, `examples`);
  examples.tplPath = path.join(tplDir, 'examples-component.template.html');
  let func = '';
  while (func == '' || hasIn(comTpl.syswords.constant, func)) func = randomString();
  let folderPath = path.join(`${examples.path}/${page.lang}`, 'default');
  let cates: NcCates = { folderPath };
  hanlderCates(cates, page);
  generateCates(cates, comTpl);

  let examplesTpl = fs.readFileSync(examples.tplPath, 'utf8');
  page.custom = replaceKey(page.custom, '__examples', replaceKey(examplesTpl, '__tabs', cates.content));
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
    page.props = await hanlderProp(propertyPath, page.lang);
    page.custom = replaceKey(page.custom, '__api', `<x-api>${generateProps(...page.props)}</x-api>`);
  }
}

export async function handlerPattern(page: NcPage) {
  if (page.custom.indexOf('__pattern') === -1) return;
  let patterns = await hanlderPattern(path.join(page.path, 'style', `param.scss`));
  page.custom = replaceKey(page.custom, '__pattern', `<x-pattern>${generatePatterns(...patterns)}</x-pattern>`);
}

export async function handlerModule(page: NcPage) {
  let fsPath = path.join(page.path, `${page.name}.module.ts`);
  if (!fs.existsSync(fsPath)) return;
  let module = await hanlderModule(fsPath);
  if (!module) return;
  let temp = page.templates.find((x) => x.name === 'component' && x.type === 'default');
  if (!temp) return;
  let tpl = fs.readFileSync(path.join(tplDir, 'highlight-component.template.html'), 'utf8');
  let param = randomString(7);
  tpl = replaceKey(tpl, '__type', 'typescript');
  tpl = replaceKey(tpl, '__data', param);

  if (module.exports.length !== 0) {
    let text = `import { ${module.exports.map((x) => x).join(', ')} } from '@ng-nest/ui/${page.name}';\n// or`;
    text += `\nimport { ${module.module} } from '@ng-nest/ui/${page.name}';\``;
    temp.syswords.constant += `${param} = \`${text}`;
  } else {
    let text = `// Using root service`;
    text += `\nimport { X${page.name
      .replace(/_/g, '')
      .split('-')
      .map((x) => firstLetterCapital(x))
      .join('')}Service } from '@ng-nest/ui/${page.name}';\``;
    temp.syswords.constant += `${param} = \`${text}`;
  }

  page.custom = replaceKey(page.custom, '__component', `${tpl}`);
}
