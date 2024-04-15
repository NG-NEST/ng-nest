import { Marked } from 'marked';
import { loadFront } from 'yaml-front-matter';
import { existsSync, readFileSync } from 'fs-extra';

export function parseMdDoc(path: string) {
  let lstat = existsSync(path);
  if (!lstat) return false;
  const file = readFileSync(path, 'utf8');
  const meta = loadFront(file);
  const content = meta.__content;
  const mt = { ...meta };
  delete mt.__content;

  const remark = require('remark')();
  const ast = remark.parse(content);
  let contentStr = '';
  const md = new Marked();

  for (let i = 0; i < ast.children.length; i++) {
    const child = ast.children[i];
    contentStr += md.parse(remark.stringify(child));
  }
  contentStr = contentStr.replace(/@/g, '&#64;');
  return {
    meta: mt,
    content: contentStr
  };
}
