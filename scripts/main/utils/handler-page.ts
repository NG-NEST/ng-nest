import * as path from 'path';
import { isString } from 'util';
import { NcTplName, NcTemplate } from '../interfaces/template';
import { NcPage } from '../interfaces/page';

const tplDir = path.resolve(__dirname, '../../main/templates');

export function handlerPage(page: NcPage) {
  let templates: NcTplName[] = ['component', 'module', 'routes-module'];
  templates.unshift({
    name: `${page.type}-component`,
    extension: 'html',
    type: page.type
  });
  handleTemplates(page, tplDir, page.genDir, ...templates);
}

export function handleTemplates(page: NcPage, fromDir: string, toDir: string, ...name: NcTplName[]): NcTemplate[] {
  let tpls: NcTemplate[] = [];
  name.forEach(x => {
    let tpl: NcTemplate;
    if (isString(x)) {
      tpl = new NcTemplate({ fileName: page.fileName, name: x });
    } else {
      x.fileName = page.fileName;
      tpl = new NcTemplate(x);
    }
    tpl.tplPath = path.join(fromDir, `${tpl.name}.template.${tpl.extension}`);
    tpl.genPath = path.join(toDir, `${tpl.genName}`);
    tpls.push(tpl);
  });
  page.templates = [...page.templates, ...tpls];
  return tpls;
}

export function createRouterOutlet(name: string) {
  return new NcPage({
    prefix: name,
    name: name,
    fileName: name,
    type: 'router'
  });
}

export function pageAddChildren(page: NcPage, children: NcPage[]) {
  if (page && children) {
    let routes = page.templates.find(x => x.name === 'routes-module');
    if (routes) {
      children.forEach((x, index) => {
        let route = `      {
        path: "${x.name}",
        loadChildren: () => import("./${x.name}/${x.fileName}.module").then(x => x.${x.capName}Module)
      }`;
        routes.syswords.loadChildren += `\n${route}${index !== children.length - 1 ? ',' : '\n    '}`;
      });
    }
  }
}
