import { XProperty, XType } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

/**
 * Highlight
 * @selector x-highlight
 * @decorator component
 */
export const XHighlightPrefix = 'x-highlight';

/**
 * Highlight Property
 */
@Component({ template: '' })
export class XHighlightProperty extends XProperty {
  /**
   * @zh_CN 代码类型
   * @en_US Code type
   */
  @Input() type: string;
  /**
   * @zh_CN 数据
   * @en_US Data
   */
  @Input() data: string;
  /**
   * @zh_CN 高亮行数据
   * @en_US Highlight row data
   */
  @Input() highlightLines: XHighlightLines = {};
}

/**
 * @zh_CN 高亮行数据
 * @en_US Highlight row data
 * @description {'danger': '1, 2, 4', 'primary': '7-10, 12, 15-20'}
 */
export type XHighlightLines = { [property: string]: string };
