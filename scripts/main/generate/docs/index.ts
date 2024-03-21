import { NcPage } from '../../interfaces/page';
import { NcMenu } from '../../interfaces/menu';
import {
  handlerPage,
  createRouterOutlet,
  pageAddChildren,
  generatePage,
  parseMdDoc,
  generateMenu,
  handlerComponent,
  handlerDemo,
  orderBy
} from '../../utils';
import * as path from 'path';
import * as fs from 'fs-extra';

export const docsDir = path.resolve(__dirname, '../../../../docs');
export const componentsDir = path.resolve(__dirname, '../../../../lib/ng-nest/ui');
export const genDir = path.resolve(__dirname, '../../../../src/main/docs');
export const genMenusDir = path.resolve(__dirname, '../../../../src/app');
export const docsPrefix = 'docs';
export const languages = ['zh_CN', 'en_US'];

export class NcDocs {
  page: NcPage;
  genDir: string = genDir;
  menus: NcMenu[] = [];

  constructor() {
    languages.forEach(async (lang) => {
      await this.genPages(lang, docsPrefix);
    });
  }

  async genPages(lang: string, outPath: string) {
    this.page = createRouterOutlet(`${outPath}-${lang}`);
    this.page.genDir = path.join(genDir, lang);
    handlerPage(this.page);
    this.addChildren(this.page, docsDir, `${outPath}/${lang}`, lang);
    generatePage(this.page);
    this.menus = orderBy(this.menus, ['lang', 'pid', 'category', 'order', 'label']);
    generateMenu(genMenusDir, this.menus);
  }

  addChildren(
    page: NcPage,
    docDir: string,
    router: string,
    lang: string,
    index?: string,
    level?: number,
    isComponent = false
  ) {
    let children = fs.readdirSync(docDir);
    if (typeof level !== 'undefined') level--;
    children.forEach(async (x, i) => {
      if (x === 'demo') {
        handlerDemo(page, docDir, router);
      } else {
        const dir = path.join(docDir, x);
        const stat = fs.statSync(dir);
        if (stat.isDirectory()) {
          const read = parseMdDoc(path.join(dir, `${isComponent ? 'docs/' : ''}readme.${lang}.md`));
          if (read && !read.meta.hidden) {
            const folder = path.join(page.genDir, x);
            const child = this.createChild(read, x, folder, lang);
            child.genDir = folder;
            child.path = dir;
            child.lang = lang;
            page.children = [...page.children, child];
            const thisRouter = `${router}/${x}`;
            const menu = this.createMenu(read, x, index, i, thisRouter, lang);
            if (x === 'components') {
              child.path = componentsDir;
              this.addChildren(child, componentsDir, menu.routerLink, lang, menu.id, 1, true);
            } else if (level !== 0) {
              this.addChildren(child, dir, menu.routerLink, lang, menu.id, level);
            }
            if (dir.indexOf(componentsDir) === 0 && typeof read.meta.type === 'undefined') {
              await handlerComponent(child);
            }
            if (child.name === 'button') {
              console.log(child.props);
            }

            generatePage(child);
          }
        }
      }
    });
    page.children = orderBy(page.children, ['order']);
    pageAddChildren(page, page.children);
  }

  createChild(read: { meta: any; content: any }, dirName: string, folder: string, lang: string) {
    let child =
      read.meta.type == 'router'
        ? createRouterOutlet(dirName)
        : new NcPage({
            name: dirName,
            prefix: docsPrefix,
            type: 'custom',
            custom: read.content
          });
    child.default = read.meta.default;
    child.order = read.meta.order;
    child.genDir = folder;
    handlerPage(child);
    return child;
  }

  createMenu(
    read: { meta: any; content?: string },
    dirName: string,
    index: string,
    i: number,
    routerLink: string,
    lang: string
  ): NcMenu {
    const id = index == null ? `${i}` : `${index}-${i}`;
    const pid = index == null || languages.includes(index) ? null : `${index}`;
    const menu: NcMenu = Object.assign({ id, pid, name: dirName, routerLink, lang }, read.meta);
    this.menus = [...this.menus, menu];
    return menu;
  }
}
global['NcDocs'] = new NcDocs();
