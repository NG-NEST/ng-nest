import * as fs from 'fs-extra';
import { NcTabs } from '../interfaces/tabs';
import { replaceKey } from '.';
import * as _ from 'lodash';

/**
 * 生成标签页组件代码
 *
 * @export
 * @param {NcTabs} tabs
 * @returns
 */
export function generateTabs(tabs: NcTabs): NcTabs {
  let tpl = fs.readFileSync(tabs.tplPath, 'utf8');
  let content = '';
  tabs.tabs.forEach(x => {
    content += `<x-tab label="${x.label}">${x.content}</x-tab>\n`;
  });
  tpl = replaceKey(tpl, '__layout', tabs.layout);
  tpl = replaceKey(tpl, '__content', content);
  tabs.content = tpl;

  return tabs;
}
