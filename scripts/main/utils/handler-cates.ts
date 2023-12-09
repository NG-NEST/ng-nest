import * as path from 'path';
import * as fs from 'fs-extra';
import { NcCate, NcCates, NcCode, NcCodeBox } from '../interfaces/examples';
import { orderBy, parseMdDoc } from '.';
import { NcPage } from '../interfaces/page';
import { NcTemplate } from '../interfaces/template';

/**
 * 示例分类处理
 *
 * @export
 * @param {NcCates} cates
 */
export function hanlderCates(cates: NcCates, page: NcPage) {
  let folder = fs.readdirSync(cates.folderPath, 'utf8');
  let component = page.templates.find((x) => x.type == 'default' && x.name == 'component');
  cates.list = [];
  folder.forEach((x) => {
    let catePath = path.join(cates.folderPath, x);
    if (fs.lstatSync(catePath).isDirectory()) {
      let readme = parseMdDoc(path.join(catePath, 'readme.md'));
      if (readme) {
        let cate: NcCate = {
          name: x,
          order: readme.meta.order,
          label: readme.meta.label,
          path: catePath
        };
        handlerCodeBoxes(cate, readme, component, page);
        cates.list.push(cate);
        cates.list = orderBy(cates.list, ['order'], ['asc']);
      }
    }
  });
}

/**
 * 分类中的代码处理
 *
 * @export
 * @param {NcCate} cate
 * @param {*} readme
 */
export function handlerCodeBoxes(cate: NcCate, readme, component: NcTemplate, page: NcPage) {
  let folder = fs.readdirSync(cate.path, 'utf8');
  let box: NcCodeBox = {
    codes: [],
    description: readme.content
  };
  folder.forEach((x) => {
    if (x !== 'readme.md') {
      let subType = x.slice(0, x.lastIndexOf('.'));
      let code: NcCode = {
        name: x,
        type: x.slice(x.lastIndexOf('.') + 1, x.length),
        subType: subType.slice(subType.lastIndexOf('.') + 1, subType.length),
        content: fs.readFileSync(path.join(cate.path, x), 'utf8')
      };

      if (code.type === 'ts' && code.subType === 'component') {
        const matchSelector = code.content.match(/selector: \'(\S*)\',/);
        const matchClassName = code.content.match(/export class (\S*) /);
        if (matchSelector.length > 1) cate.selector = matchSelector[1];
        if (matchClassName.length > 1) cate.className = matchClassName[1];
        cate.rootPath = `./${cate.path
          .slice(cate.path.lastIndexOf('examples'), cate.path.length)
          .replace(/\\/g, '/')}/${x.slice(0, x.lastIndexOf(code.type) - 1)}`;
        if (cate.className) {
          component.syswords.declarations += `, ${cate.className}`;
          component.syswords.imports += `import { ${cate.className} } from '${cate.rootPath.replace(
            `/${page.lang}/`,
            '/'
          )}';\n`;
        }
      }
      box.codes.push(code);
    }
  });
  cate.codeBoxes = box;
}
