import * as path from 'path';
import { NcPage } from '../interfaces/page';
import * as fs from 'fs-extra';
import { NcDemoTreeNode } from '../interfaces/demo';
import { randomString, replaceKey } from '.';
import _ = require('lodash');

const tplDir = path.resolve(__dirname, '../../main/templates');

export function handlerDemo(page: NcPage, docDir: string) {
  const demoPath = path.join(docDir, 'demo');
  const children = fs.readdirSync(path.join(docDir, 'demo'));
  for (let child of children) {
    const treeFile = this.getTreeFile(demoPath, child);
    let temp = page.templates.find((x) => x.name === 'component' && x.type === 'default');
    if (temp !== null) {
      let tpl = fs.readFileSync(path.join(tplDir, 'tree-file.component.template.html'), 'utf8');
      let param = randomString(8);
      tpl = replaceKey(tpl, '__data', param);
      temp.syswords.constant += `${param} = ${JSON.stringify(treeFile)};\n`;
      page.custom = replaceKey(page.custom, `__${child}`, `${tpl}`);
    }
  }
  if (children.length > 0) {
    let mod = page.templates.find((x) => x.type === 'default' && x.name === 'module');
    mod.syswords.imports += `import { XTreeFileModule } from '@ng-nest/ui/tree-file';\n`;
    mod.syswords.modules += `, XTreeFileModule`;
  }
}

export function getTreeFile(demoPath: string, demo: string) {
  const spt = demo.split('__');
  if (spt.length !== 2) return;
  let nodes: NcDemoTreeNode[] = [{ id: demo, label: spt[0] }];
  const rootPath = path.join(demoPath, demo);
  const root = fs.readdirSync(rootPath);
  const getChildren = (children, dir) => {
    let sortNodes: NcDemoTreeNode[] = [];
    for (let child of children) {
      const childPath = path.join(demoPath, dir, child);
      const stat = fs.lstatSync(childPath);
      if (stat.isDirectory()) {
        sortNodes = [...sortNodes, { id: `${dir}/${child}`, pid: dir, label: child, leaf: true }];
        getChildren(fs.readdirSync(childPath), `${dir}/${child}`);
      } else {
        sortNodes = [
          ...sortNodes,
          {
            id: `${dir}/${child}`,
            pid: dir,
            label: child,
            url: `${dir}/${child}`,
            type: child.indexOf('.') !== -1 ? child.slice(child.lastIndexOf('.') + 1, child.length) : ''
          }
        ];
      }
    }
    sortNodes = _.orderBy(sortNodes, [(x) => x.leaf, (x) => x.label.toLowerCase()]);
    console.log('----------');
    console.log(sortNodes);
    console.log('----------');
    nodes = [...nodes, ...sortNodes];
  };
  getChildren(root, demo);

  return nodes;
}
