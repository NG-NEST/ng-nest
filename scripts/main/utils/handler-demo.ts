import * as path from 'path';
import { NcPage } from '../interfaces/page';
import * as fs from 'fs-extra';
import { NcDemoTreeNode } from '../interfaces/demo';
import { randomString, replaceKey, parseMdDoc, orderBy } from '.';

const tplDir = path.resolve(__dirname, '../../main/templates');

export function handlerDemo(page: NcPage, docDir: string, router: string) {
  const demoPath = path.join(docDir, 'demo');
  const children = fs.readdirSync(path.join(docDir, 'demo'));
  router = router.replace(`/${page.lang}/`, '/');
  let temp = page.templates.find((x) => x.name === 'component' && x.type === 'default');
  if (temp !== null) {
    temp.syswords.imports += `import { environment } from '@environments';\n`;
    temp.syswords.constant += `static = environment.static;\n`;
    for (let child of children) {
      const treeFile = getTreeFile(demoPath, child, router);
      let tpl = fs.readFileSync(path.join(tplDir, 'tree-file.component.template.html'), 'utf8');
      let constant = randomString(8);
      let params = getKeys(page.custom, child);
      tpl = replaceKey(tpl, '__data', constant);
      tpl = replaceKey(tpl, '__activatedId', params?.length > 0 ? `${child}/${params[0]}` : '');
      tpl = replaceKey(tpl, '__showTree', params?.length > 1 ? `${params[1]}` : 'true');
      tpl = replaceKey(tpl, '__showCrumb', params?.length > 2 ? `${params[2]}` : 'true');
      tpl = replaceKey(tpl, '__maxHeight', params?.length > 3 ? `${params[3]}` : '37.5rem');
      temp.syswords.constant += `${constant} = ${JSON.stringify(treeFile)};\n`;
      page.custom = replaceKey(page.custom, `__${child}${params?.length > 0 ? ':' + params.join(':') : ''}`, `${tpl}`);
    }
  }
  // if (children.length > 0) {
  //   let mod = page.templates.find((x) => x.type === 'default' && x.name === 'module');
  //   mod.syswords.imports += `import { XTreeFileComponent } from '@ng-nest/ui/tree-file';\n`;
  //   mod.syswords.modules += `, XTreeFileComponent`;
  // }
}

export function getTreeFile(demoPath: string, demo: string, router: string) {
  const spt = demo.split('__');
  if (spt.length !== 2) return;
  let nodes: NcDemoTreeNode[] = [{ id: demo, label: spt[1] }];
  const rootPath = path.join(demoPath, demo);
  const root = fs.readdirSync(rootPath);
  const getChildren = (children, dir) => {
    let sortNodes: NcDemoTreeNode[] = [];
    for (let child of children) {
      if (child.indexOf('__') === 0) continue;
      const childPath = path.join(demoPath, dir, child);
      const stat = fs.lstatSync(childPath);
      if (stat.isDirectory()) {
        sortNodes = [...sortNodes, { id: `${dir}/${child}`, pid: dir, label: child }];
        getChildren(fs.readdirSync(childPath), `${dir}/${child}`);
      } else {
        sortNodes = [
          ...sortNodes,
          {
            id: `${dir}/${child}`,
            pid: dir,
            label: child,
            url: `${router}/demo/${dir}/${child}`,
            type: child.indexOf('.') !== -1 ? child.slice(child.lastIndexOf('.') + 1, child.length) : '',
            highlightLines: getHighlightLines(path.join(demoPath, dir, `__${child}.md`))
          }
        ];
      }
    }
    sortNodes = orderBy(
      sortNodes.map((x) => {
        x.label = x.label.toLowerCase();
        return x;
      }),
      ['leaf', 'label'],
      ['asc', 'asc']
    );
    nodes = [...nodes, ...sortNodes];
  };
  getChildren(root, demo);

  return nodes;
}

export function getKeys(content: string, demo: string) {
  const key = `{{ __${demo}:`;
  const index = content.indexOf(key);
  if (index !== -1) {
    let str = content.slice(index + key.length, content.length);
    str = str.slice(0, str.indexOf(` }}`));
    return str.split(':');
  } else {
    return null;
  }
}

export function getHighlightLines(filePath: string) {
  let result: { [property: string]: string } = {};
  const md = parseMdDoc(filePath);
  if (md) {
    result = md.meta;
  }
  return result;
}
