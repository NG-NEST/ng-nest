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
   * 代码类型
   */
  @Input() type: string;
  /**
   * 数据
   */
  @Input() data: string;
  /**
   * 高亮行数据
   */
  @Input() highlightLines: XHighlightLines = {};
}

/**
 * 高亮行数据
 * @description {'danger': '1, 2, 4', 'primary': '7-10, 12, 15-20'}
 */
export type XHighlightLines = { [prop: string]: string };
