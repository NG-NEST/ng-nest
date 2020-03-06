import * as fs from 'fs-extra';
import * as md from 'marked';

export function mdToHtml(path: string) {
  if (!fs.existsSync(path)) return;
  return md(fs.readFileSync(path, 'utf8'));
}
