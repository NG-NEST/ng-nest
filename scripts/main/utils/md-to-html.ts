import { existsSync, readFileSync } from 'fs-extra';
import { Marked } from 'marked';

export function mdToHtml(path: string) {
  if (!existsSync(path)) return;
  const md = new Marked();
  return md.parse(readFileSync(path, 'utf8'));
}
