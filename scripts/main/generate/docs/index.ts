import { NcPage } from '../../interfaces/page';
import { NcMenu } from '../../interfaces/menu';
import { NcProp, NcPropType } from '../../interfaces/prop';
import {
  handlerPage,
  createRouterOutlet,
  pageAddChildren,
  generatePage,
  parseMdDoc,
  generateMenu,
  handlerComponent,
  handlerDemo,
  orderBy,
  handlerCore,
  generateCore
} from '../../utils';
import { NcCore } from '../../interfaces/core';
import { join, resolve } from 'node:path';
import { readdirSync, statSync } from 'fs-extra';

export const docsDir = resolve(__dirname, '../../../../docs');
export const componentsDir = resolve(__dirname, '../../../../lib/ng-nest/ui');
export const genDir = resolve(__dirname, '../../../../src/main/docs');
export const genMenusDir = resolve(__dirname, '../../../../src/app');
export const genCoreDir = resolve(__dirname, '../../../../src/app');
export const docsPrefix = 'docs';
export const languages = ['zh_CN', 'en_US'];

export class NcDocs {
  page: NcPage;
  genDir: string = genDir;
  menus: NcMenu[] = [];
  propTypes: NcProp[] = [];
  core: NcCore;

  constructor() {
    languages.forEach(async (lang) => {
      await this.genPages(lang, docsPrefix);
      await this.genCore(lang);
    });
  }

  async genPages(lang: string, outPath: string) {
    this.page = createRouterOutlet(`${outPath}-${lang}`);
    this.page.genDir = join(genDir, lang);
    handlerPage(this.page);
    await this.addChildren(this.page, docsDir, `${outPath}/${lang}`, lang);

    generatePage(this.page);
    this.menus = orderBy(this.menus, ['lang', 'pid', 'category', 'order', 'label']);
    generateMenu(genMenusDir, this.menus);
    // generateCoreTypes(genCoreTypesDir, )
  }

  async addChildren(
    page: NcPage,
    docDir: string,
    router: string,
    lang: string,
    index?: string,
    level?: number,
    isComponent = false
  ) {
    let children = readdirSync(docDir);
    if (typeof level !== 'undefined') level--;
    for (let i = 0; i < children.length; i++) {
      const x = children[i];
      if (x === 'demo') {
        handlerDemo(page, docDir, router);
      } else {
        const dir = join(docDir, x);
        const stat = statSync(dir);
        if (stat.isDirectory()) {
          const read = parseMdDoc(join(dir, `${isComponent ? 'docs/' : ''}readme.${lang}.md`));
          if (read && !read.meta.hidden) {
            const folder = join(page.genDir, x);
            const child = this.createChild(read, x, folder, lang);
            child.genDir = folder;
            child.path = dir;
            child.lang = lang;
            page.children = [...page.children, child];
            const thisRouter = `${router}/${x}`;
            const menu = this.createMenu(read, x, index, i, thisRouter, lang);
            if (x === 'components') {
              child.path = componentsDir;
              await this.addChildren(child, componentsDir, menu.routerLink, lang, menu.id, 1, true);
            } else if (level !== 0) {
              await this.addChildren(child, dir, menu.routerLink, lang, menu.id, level);
            }
            if (dir.indexOf(componentsDir) === 0 && typeof read.meta.type === 'undefined') {
              await handlerComponent(child);
              const types = child.props.filter((x) => x.type === NcPropType.Type);
              if (types && types.length > 0) {
                this.propTypes.push(...types);
              }
            }

            generatePage(child);
          }
        }
      }
    }
    children.forEach(async (x, i) => {});
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

  async genCore(lang: string) {
    this.core = await handlerCore(lang);
    generateCore(join(genDir, lang), this.core);
  }
}
global['NcDocs'] = new NcDocs();
